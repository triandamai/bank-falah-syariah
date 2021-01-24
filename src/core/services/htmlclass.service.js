import objectPath from "object-path";
import {
  ADD_BODY_CLASSNAME,
  REMOVE_BODY_CLASSNAME,
  ADD_CLASSNAME,
} from "@/store";
import store from "@/store";

const HtmlClass = {
  config: null,

  init(config) {
    if (typeof config !== "undefined") {
      this.config = config;
    }

    // init base layout
    this.initLayout();

    // init header and subheader menu
    this.initHeader();
    this.initSubheader();

    // init aside and aside menu
    this.initAside();

    // init footer
    this.initFooter();
  },

  /**
   * Init Layout
   */
  initLayout() {
    if (objectPath.has(this.config, "self.body.class")) {
      const _selfBodyClass = objectPath
        .get(this.config, "self.body.class")
        .toString();
      if (_selfBodyClass) {
        const bodyClasses = _selfBodyClass.split(" ");
        bodyClasses.forEach((cssClass) => {
          store.dispatch("htmlclass/" + ADD_BODY_CLASSNAME, cssClass);
        });
      }
    }

    const bgImage = objectPath.get(this.config, "self.body.background-image");
    if (typeof bgImage !== "undefined") {
      document.body.style.backgroundImage = `url(${bgImage})`;
    }

    // Offcanvas directions
    store.dispatch("htmlclass/" + ADD_BODY_CLASSNAME, "quick-panel-right");
    store.dispatch("htmlclass/" + ADD_BODY_CLASSNAME, "demo-panel-right");
    store.dispatch("htmlclass/" + ADD_BODY_CLASSNAME, "offcanvas-right");

    // Properly close mobile header menu
    store.dispatch(
      "htmlclass/" + REMOVE_BODY_CLASSNAME,
      "header-menu-wrapper-on"
    );
  },

  /**
   * Init Header
   */
  initHeader() {
    // Fixed header
    if (objectPath.get(this.config, "header.self.fixed.desktop")) {
      store.dispatch("htmlclass/" + ADD_BODY_CLASSNAME, "header-fixed");
      store.dispatch("htmlclass/" + ADD_CLASSNAME, {
        position: "header",
        className: "header-fixed",
      });
    } else {
      store.dispatch("htmlclass/" + ADD_BODY_CLASSNAME, "header-static");
    }

    if (objectPath.get(this.config, "header.self.fixed.mobile")) {
      store.dispatch("htmlclass/" + ADD_BODY_CLASSNAME, "header-mobile-fixed");
      store.dispatch("htmlclass/" + ADD_CLASSNAME, {
        position: "header_mobile",
        className: "header-mobile-fixed",
      });
    }

    if (objectPath.get(this.config, "header.menu.self.display")) {
      store.dispatch("htmlclass/" + ADD_CLASSNAME, {
        position: "header_menu",
        className: `header-menu-layout-${objectPath.get(
          this.config,
          "header.menu.self.layout"
        )}`,
      });

      // Menu
      if (objectPath.get(this.config, "header.menu.self.root-arrow")) {
        store.dispatch("htmlclass/" + ADD_CLASSNAME, {
          position: "header_menu",
          className: "header-menu-root-arrow",
        });
      }
    }
  },

  /**
   * Init Subheader
   */
  initSubheader() {
    // Fixed content head
    if (
      objectPath.get(this.config, "subheader.fixed") &&
      objectPath.get(this.config, "header.self.fixed.desktop")
    ) {
      store.dispatch("htmlclass/" + ADD_BODY_CLASSNAME, "subheader-fixed");
    }

    if (objectPath.get(this.config, "subheader.display")) {
      store.dispatch("htmlclass/" + ADD_BODY_CLASSNAME, "subheader-enabled");
    }

    if (objectPath.has(this.config, "subheader.style")) {
      store.dispatch(
        "htmlclass/" + ADD_BODY_CLASSNAME,
        `subheader-${objectPath.get(this.config, "subheader.style")}`
      );
    }
  },

  /**
   * Init Aside
   */
  initAside() {
    // Reset aside class in body
    store.dispatch("htmlclass/" + REMOVE_BODY_CLASSNAME, "aside-enabled");
    store.dispatch("htmlclass/" + REMOVE_BODY_CLASSNAME, "aside-fixed");
    store.dispatch("htmlclass/" + REMOVE_BODY_CLASSNAME, "aside-static");
    store.dispatch("htmlclass/" + REMOVE_BODY_CLASSNAME, "aside-minimize");

    if (objectPath.get(this.config, "aside.self.display") !== true) {
      return;
    }

    // Add aside class enabled in body
    store.dispatch("htmlclass/" + ADD_BODY_CLASSNAME, "aside-enabled");

    // Fixed Aside
    if (objectPath.get(this.config, "aside.self.fixed")) {
      store.dispatch("htmlclass/" + ADD_BODY_CLASSNAME, "aside-fixed");
      store.dispatch("htmlclass/" + ADD_CLASSNAME, {
        position: "aside",
        className: "aside-fixed",
      });
    } else {
      store.dispatch("htmlclass/" + ADD_BODY_CLASSNAME, "aside-static");
    }

    // Default fixed
    if (objectPath.get(this.config, "aside.self.minimize.default")) {
      store.dispatch("htmlclass/" + ADD_BODY_CLASSNAME, "aside-minimize");
    }

    // Dropdown Submenu
    if (objectPath.get(this.config, "aside.menu.dropdown")) {
      store.dispatch("htmlclass/" + ADD_CLASSNAME, {
        position: "aside_menu",
        className: "aside-menu-dropdown",
      });
    }
  },

  /**
   * Init Footer
   */
  initFooter() {
    // Fixed header
    if (objectPath.get(this.config, "footer.fixed")) {
      store.dispatch("htmlclass/" + ADD_BODY_CLASSNAME, "footer-fixed");
    }
  },
};

export default HtmlClass;
