
import ApiServices from "@/services/api.service";

const state = {

  searchData: [],
  togglesidebar: true,
  menu: []
};

// getters
const getters = {};

// mutations
const mutations = {
  opensidebar: state => {
    state.togglesidebar = !state.togglesidebar;
  },
  resizetoggle: state => {
    if (window.innerWidth < 1199) {
      state.togglesidebar = false;
    } else {
      state.togglesidebar = true;
    }
  },
  searchTerm: (state, term) => {
    let items = [];
    var searchval = term.toLowerCase();
    state.menu.filter(menuItems => {
      if (menuItems.title) {
        if (
          menuItems.title.toLowerCase().includes(searchval) &&
          menuItems.type === "link"
        ) {
          items.push(menuItems);
        }
        if (!menuItems.children) return false;
        menuItems.children.filter(subItems => {
          if (
            subItems.title.toLowerCase().includes(searchval) &&
            subItems.type === "link"
          ) {
            subItems.icon = menuItems.icon;
            items.push(subItems);
          }
          if (!subItems.children) return false;
          subItems.children.filter(suSubItems => {
            if (suSubItems.title.toLowerCase().includes(searchval)) {
              suSubItems.icon = menuItems.icon;
              items.push(suSubItems);
            }
          });
        });
        state.searchData = items;
      }
    });
  },
  setNavActive: (state, item) => {
    if (!item.active) {
      state.menu.forEach(a => {
        if (state.menu.includes(item)) a.active = false;
        if (!a.children) return false;
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
      });
    }
    item.active = !item.active;
  },
  setActiveRoute: (state, item) => {
    state.menu.filter(menuItem => {
      if (menuItem !== item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  },
  setMenu: (state, data) => {
    state.menu = data;
  }
};

// actions
const actions = {
  opensidebar: (context, term) => {
    context.commit("opensidebar", term);
  },
  resizetoggle: (context, term) => {
    context.commit("resizetoggle", term);
  },
  searchTerm: (context, term) => {
    context.commit("searchTerm", term);
  },
  setNavActive: (context, item) => {
    context.commit("setNavActive", item);
  },
  setActiveRoute: (context, item) => {
    context.commit("setActiveRoute", item);
  },
  getMenu: ({ commit }) => {
    return new Promise((resolve) => {
      ApiServices.get(`/route?param=dsvgdv`)
        .then(({status,data}) => {
          if (status === 201 || status === 200) {
            resolve({ success: true, message: "sukses" });
            commit("setMenu", data.data.data);
          } else {
            resolve({ success: false, message: status });
          }
        }).catch(() => {

            resolve({
              success: false,
              message: "Terjadi kesalahan coba lagi nanti!",
            });

        });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
