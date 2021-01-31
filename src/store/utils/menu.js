/*eslint-disable*/
/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
const menu = [
  {
    id: 1,
    menu_name: "Nasabah",
    menu_icon: "",
    menu_url: "/nasabah",
    menu_parent_id: null,
    menu_description: "System for super",
    privilages: ["super"],
    children: [],
  },
  {
    id: 2,
    menu_name: "Master Data",
    menu_icon: "",
    menu_url: "/master",
    menu_parent_id: null,
    menu_description: "System for super",
    privilages: ["super"],
    children: [
      {
        id: 1,
        menu_name: "Akad",
        menu_icon: "",
        menu_url: "/akad",
        menu_parent_id: 2,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Jenis Transaksi",
        menu_icon: "",
        menu_url: "/jenistransaksi",
        menu_parent_id: 2,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Produk",
        menu_icon: "",
        menu_url: "/produk",
        menu_parent_id: 2,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Jabatan",
        menu_icon: "",
        menu_url: "/jabatan",
        menu_parent_id: 2,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Pegawai",
        menu_icon: "",
        menu_url: "/pegawai",
        menu_parent_id: 2,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
    ],
  },
  {
    id: 4,
    menu_name: "Rekening",
    menu_icon: "",
    menu_url: "/rekening",
    menu_parent_id: null,
    menu_description: "System for super",
    privilages: ["super"],
    children: [
      {
        id: 1,
        menu_name: "Deposito",
        menu_icon: "",
        menu_url: "/deposito",
        menu_parent_id: 4,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Pembiayaan",
        menu_icon: "",
        menu_url: "/pembiayaan",
        menu_parent_id: 3,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Simpanan",
        menu_icon: "",
        menu_url: "/simpanan",
        menu_parent_id: 3,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
    ],
  },
  {
    id: 1,
    menu_name: "System",
    menu_icon: "",
    menu_url: "/system",
    menu_parent_id: null,
    privilages: ["super"],
    menu_description: "System for super",
    children: [
      {
        id: 1,
        menu_name: "Menu",
        menu_icon: "",
        menu_url: "/menu",
        menu_parent_id: 1,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },

      {
        id: 1,
        menu_name: "User",
        menu_icon: "",
        menu_url: "/user",
        menu_parent_id: 1,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Group",
        menu_icon: "",
        menu_url: "/group",
        menu_parent_id: 1,
        menu_description: "System for super",
        privilages: ["super", "admin"],
        children: [],
      },
      {
        id: 1,
        menu_name: "Role",
        menu_icon: "",
        menu_url: "/role",
        menu_parent_id: 1,
        menu_description: "System for super",
        privilages: ["super"],
        children: [],
      },
    ],
  },
];

const defaultMenu = () => {
  let result = [];
  menu.forEach((parent) => {
    result.push({
      path: parent.menu_url,
      name: parent.menu_name,
      description: parent.menu_description,
      privilages: parent.privilages,
    });
    parent.children.forEach((children) => {
      result.push({
        path: children.menu_url,
        name: children.menu_name,
        description: children.menu_description,
        privilages: children.privilages,
      });
    });
  });
  return result;
};

const quickAction = [
  [
    {
      id: 1,
      menu_name: "Akuntansi",
      menu_icon: require("@/assets/images/svg/icons/Shopping/Euro.svg"),
      menu_url: "/",
      menu_parent_id: null,
      privilages: ["super"],
      menu_description: "System for super",
    },
    {
      id: 1,
      menu_name: "Nasabah",
      menu_icon: require("@/assets/images/svg/icons/Communication/Mail-attachment.svg"),
      menu_url: "",
      menu_parent_id: null,
      privilages: ["super"],
      menu_description: "System for super",
    },
  ],
  [
    {
      id: 1,
      menu_name: "Tabungan",
      menu_icon: require("@/assets/images/svg/icons/Shopping/Box2.svg"),
      menu_url: "",
      menu_parent_id: null,
      privilages: ["super"],
      menu_description: "System for super",
    },
    {
      id: 1,
      menu_name: "Akun",
      menu_icon: require("@/assets/images/svg/icons/Communication/Group.svg"),
      menu_url: "",
      menu_parent_id: null,
      privilages: ["super"],
      menu_description: "System for super",
    },
  ],
  [
    {
      id: 1,
      menu_name: "Email",
      menu_icon: require("@/assets/images/svg/icons/Shopping/Chart-bar1.svg"),
      menu_url: "",
      menu_parent_id: null,
      privilages: ["super"],
      menu_description: "System for super",
    },
    {
      id: 1,
      menu_name: "Pengaturan",
      menu_icon: require("@/assets/images/svg/icons/Design/Color-profile.svg"),
      menu_url: "",
      menu_parent_id: null,
      privilages: ["super"],
      menu_description: "System for super",
    },
  ],
  [
    {
      id: 1,
      menu_name: "Laporan",
      menu_icon: require("@/assets/images/svg/icons/Shopping/Euro.svg"),
      menu_url: "",
      menu_parent_id: null,
      privilages: ["super"],
      menu_description: "System for super",
    },
  ],
];

export { quickAction, menu, defaultMenu };
