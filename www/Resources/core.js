var Alloy = require("alloy");

var UTIL = require("utilities");

var drupalServices = require("drupalServices");

var APP = {
    ID: null,
    VERSION: null,
    CVERSION: "2.3.3",
    LEGAL: {
        COPYRIGHT: null,
        TOS: null,
        PRIVACY: null
    },
    ConfigurationURL: null,
    Nodes: [],
    Plugins: null,
    Settings: null,
    Device: {
        isHandheld: Alloy.isHandheld,
        isTablet: Alloy.isTablet,
        type: Alloy.isHandheld ? "handheld" : "tablet",
        os: null,
        name: null,
        version: Titanium.Platform.version,
        versionMajor: parseInt(Titanium.Platform.version.split(".")[0], 10),
        versionMinor: parseInt(Titanium.Platform.version.split(".")[1], 10),
        width: Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth,
        height: Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight,
        dpi: Ti.Platform.displayCaps.dpi,
        orientation: Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT ? "LANDSCAPE" : "PORTRAIT",
        statusBarOrientation: null
    },
    Network: {
        type: Ti.Network.networkTypeName,
        online: Ti.Network.online
    },
    currentStack: -1,
    previousScreen: null,
    controllerStacks: [],
    modalStack: [],
    hasDetail: false,
    currentDetailStack: -1,
    previousDetailScreen: null,
    detailStacks: [],
    Master: [],
    Detail: [],
    MainWindow: null,
    GlobalWrapper: null,
    ContentWrapper: null,
    LoginWindow: null,
    Loading: Alloy.createWidget("com.chariti.loading").getView(),
    cancelLoading: false,
    loadingOpen: false,
    Tabs: null,
    SlideMenuProcessed: false,
    SlideMenu: null,
    SlideMenuOpen: false,
    SlideMenuEngaged: true,
    SlideMenuRight: null,
    SlideMenuRightOpen: false,
    SlideMenuRightEngaged: true,
    media: Alloy.createCollection("media"),
    recent: Alloy.createCollection("recent"),
    sendConnection: "3G",
    init: function() {
        Ti.API.debug("APP.init");
        Ti.Network.addEventListener("change", APP.networkObserver);
        Ti.App.addEventListener("pause", APP.exitObserver);
        Ti.App.addEventListener("close", APP.exitObserver);
        Ti.App.addEventListener("resumed", APP.resumeObserver);
        APP.determineDevice();
        APP.loadContent();
        APP.build();
        APP.LoginWindow.addEventListener("open", APP.postBuild);
        APP.LoginWindow.open();
    },
    postBuild: function() {
        drupalServices.systemInfo(function(sessionData) {
            if (0 !== sessionData.user.sessid) {
                APP.LoginWindow.close();
                APP.startApp();
            }
        }, function() {
            Ti.API.error("Fail");
        });
    },
    startApp: function() {
        APP.MainWindow.open();
        APP.eventsOpen.fetchEvents();
        APP.handleNavigation(2);
    },
    determineDevice: function() {
        APP.Device.os = "IOS";
        "IPHONE" == Ti.Platform.osname.toUpperCase() ? APP.Device.name = "IPHONE" : "IPAD" == Ti.Platform.osname.toUpperCase() && (APP.Device.name = "IPAD");
    },
    loadContent: function() {
        APP.log("debug", "APP.loadContent");
        var contentFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "app.json");
        contentFile.exists() || (contentFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "data/app.json"));
        var content = contentFile.read();
        var data;
        try {
            data = JSON.parse(content.text);
        } catch (_error) {
            APP.log("error", "Unable to parse downloaded JSON, reverting to packaged JSON");
            contentFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "data/app.json");
            if (!contentFile.exists()) {
                APP.log("error", "Unable to parse local JSON, dying");
                alert("Unable to open the application");
                return;
            }
            content = contentFile.read();
            data = JSON.parse(content.text);
        }
        APP.ID = data.id;
        APP.VERSION = data.version;
        APP.LEGAL = {
            COPYRIGHT: data.legal.copyright,
            TOS: data.legal.terms,
            PRIVACY: data.legal.privacy
        };
        APP.ConfigurationURL = data.configurationUrl && data.configurationUrl.length > 10 ? data.configurationUrl : false;
        APP.Settings = data.settings;
        APP.Plugins = data.plugins;
        APP.Nodes = data.tabs;
        for (var i = 0, x = APP.Nodes.length; x > i; i++) APP.Nodes[i].index = i;
        "undefined" == typeof APP.Settings.useSlideMenu && (APP.Settings.useSlideMenu = false);
    },
    build: function(_rebuild) {
        APP.log("debug", "APP.build");
        var tabs = [];
        for (var i = 0, x = APP.Nodes.length; x > i; i++) tabs.push({
            id: i,
            title: APP.Nodes[i].title,
            image: "/icons/" + APP.Nodes[i].image + ".png",
            controller: APP.Nodes[i].type.toLowerCase()
        });
        if (APP.Settings.useSlideMenu) {
            APP.buildMenu(tabs, _rebuild);
            APP.buildMenuRight(tabs, _rebuild);
        } else APP.buildTabs(tabs, _rebuild);
    },
    buildTabs: function(_tabs, _rebuild) {
        APP.log("debug", "APP.buildTabs");
        APP.Tabs.init({
            tabs: _tabs,
            colors: {
                primary: APP.Settings.colors.primary,
                secondary: APP.Settings.colors.secondary,
                text: APP.Settings.colors.text
            }
        });
        _rebuild || APP.Tabs.Wrapper.addEventListener("click", function(_event) {
            "undefined" != typeof _event.source.id && "number" == typeof _event.source.id && APP.handleNavigation(_event.source.id);
        });
    },
    buildMenu: function(_tabs, _rebuild) {
        APP.log("debug", "APP.buildMenu");
        APP.SlideMenu.init({
            tabs: _tabs
        });
        APP.GlobalWrapper.remove(APP.Tabs.Wrapper);
        APP.ContentWrapper.bottom = "0dp";
        _rebuild || APP.SlideMenu.Tabs.addEventListener("click", function(_event) {
            if ("undefined" != typeof _event.row.id && "number" == typeof _event.row.id) {
                APP.closeSettings();
                APP.handleNavigation(_event.row.id);
            } else "undefined" != typeof _event.row.id && "settings" == _event.row.id && APP.openSettings();
            APP.toggleMenu();
        });
        APP.GlobalWrapper.addEventListener("swipe", function(_event) {
            APP.SlideMenuEngaged && APP.SlideMenuRightEngaged && ("right" == _event.direction ? APP.SlideMenuRightOpen || APP.SlideMenuOpen ? APP.SlideMenuRightOpen && !APP.SlideMenuOpen && APP.closeMenuRight() : APP.openMenu() : "left" == _event.direction && (APP.SlideMenuRightOpen || APP.SlideMenuOpen ? !APP.SlideMenuRightOpen && APP.SlideMenuOpen && APP.closeMenu() : APP.openMenuRight()));
        });
    },
    buildMenuRight: function() {
        APP.log("debug", "APP.buildMenuRight");
        APP.SlideMenuRight.init();
    },
    rebuild: function() {
        APP.log("debug", "APP.rebuild");
        APP.SlideMenu.clear();
        APP.SlideMenuRight.clear();
        APP.Tabs.clear();
        APP.GlobalWrapper.add(APP.Tabs.Wrapper);
        APP.ContentWrapper.bottom = "60dp";
        APP.currentStack = -1;
        APP.previousScreen = null;
        APP.controllerStacks = [];
        APP.modalStack = [];
        APP.hasDetail = false;
        APP.currentDetailStack = -1;
        APP.previousDetailScreen = null;
        APP.detailStacks = [];
        APP.Master = [];
        APP.Detail = [];
        APP.cancelLoading = false;
        APP.loadingOpen = false;
        APP.rebuildRestart();
    },
    rebuildRestart: function() {
        APP.log("debug", "APP.rebuildRestart");
        APP.loadContent();
        APP.build(true);
        APP.handleNavigation(0);
    },
    handleNavigation: function(_id) {
        APP.log("debug", "APP.handleNavigation | " + APP.Nodes[_id].type);
        if (_id == APP.currentStack) return;
        APP.Settings.useSlideMenu ? APP.SlideMenu.setIndex(_id) : APP.Tabs.setIndex(_id);
        APP.closeLoading();
        APP.currentStack = _id;
        "undefined" == typeof APP.controllerStacks[_id] && (APP.controllerStacks[_id] = []);
        if (APP.Device.isTablet) {
            APP.currentDetailStack = _id;
            "undefined" == typeof APP.detailStacks[_id] && (APP.detailStacks[_id] = []);
        }
        var controllerStack = APP.controllerStacks[_id];
        var screen;
        APP.hasDetail = false;
        APP.previousDetailScreen = null;
        if (controllerStack.length > 0) {
            if (APP.Device.isTablet) {
                screen = controllerStack[0];
                "tablet" == screen.type && (APP.hasDetail = true);
            } else screen = controllerStack[controllerStack.length - 1];
            "tablet" == controllerStack[0].type ? controllerStack[0].fireEvent("APP:tabletScreenAdded") : controllerStack[0].fireEvent("APP:screenAdded");
        } else {
            var type = APP.Nodes[_id].type.toLowerCase();
            var tabletSupport = APP.Nodes[_id].tabletSupport;
            if (APP.Device.isTablet) if (tabletSupport) {
                type = "tablet";
                APP.hasDetail = true;
            } else switch (type) {
              case "article":
              case "event":
              case "facebook":
              case "flickr":
              case "explore":
              case "myEvents":
              case "activity":
                type = "tablet";
                APP.hasDetail = true;
            }
            screen = Alloy.createController(type, APP.Nodes[_id]).getView();
            controllerStack.push(screen);
            "tablet" == screen.type ? screen.fireEvent("APP:tabletScreenAdded") : screen.fireEvent("APP:screenAdded");
        }
        APP.addScreen(screen);
        APP.modalStack = [];
    },
    addChild: function(_controller, _params, _modal, _sibling) {
        var stack;
        stack = _modal ? APP.modalStack : APP.Device.isHandheld || !APP.hasDetail ? APP.controllerStacks[APP.currentStack] : APP.detailStacks[APP.currentDetailStack];
        var screen = Alloy.createController(_controller, _params).getView();
        stack.push(screen);
        _sibling && stack.splice(stack.length - 2, 1);
        APP.Device.isHandheld || !APP.hasDetail || _modal ? APP.addScreen(screen) : APP.addDetailScreen(screen);
    },
    removeChild: function(_modal) {
        var stack;
        stack = _modal ? APP.modalStack : APP.Device.isTablet && APP.hasDetail ? APP.detailStacks[APP.currentDetailStack] : APP.controllerStacks[APP.currentStack];
        stack[stack.length - 1];
        var previousStack;
        var previousScreen;
        stack.pop();
        if (0 === stack.length) {
            previousStack = APP.controllerStacks[APP.currentStack];
            if (APP.Device.isHandheld || !APP.hasDetail) {
                previousScreen = previousStack[previousStack.length - 1];
                APP.addScreen(previousScreen);
            } else {
                previousScreen = previousStack[0];
                _modal ? APP.addScreen(previousScreen) : APP.addDetailScreen(previousScreen);
            }
        } else {
            previousScreen = stack[stack.length - 1];
            APP.Device.isHandheld || !APP.hasDetail ? APP.addScreen(previousScreen) : _modal ? APP.addScreen(previousScreen) : APP.addDetailScreen(previousScreen);
        }
    },
    removeAllChildren: function(_modal) {
        var stack = _modal ? APP.modalStack : APP.controllerStacks[APP.currentStack];
        for (var i = stack.length - 1; i > 0; i--) stack.pop();
        APP.addScreen(stack[0]);
    },
    addScreen: function(_screen) {
        if (_screen) {
            APP.ContentWrapper.add(_screen);
            APP.previousScreen && APP.removeScreen(APP.previousScreen);
            APP.previousScreen = _screen;
        }
    },
    removeScreen: function(_screen) {
        if (_screen) {
            APP.ContentWrapper.remove(_screen);
            APP.previousScreen = null;
        }
    },
    addMasterScreen: function(_controller, _params, _wrapper) {
        var screen = Alloy.createController(_controller, _params).getView();
        _wrapper.addEventListener("APP:tabletScreenAdded", function() {
            screen.fireEvent("APP:screenAdded");
        });
        APP.Master[APP.currentStack].add(screen);
    },
    addDetailScreen: function(_screen) {
        if (_screen) {
            APP.Detail[APP.currentStack].add(_screen);
            if (APP.previousDetailScreen && APP.previousDetailScreen != _screen) {
                var pop = true;
                "PARENT" == APP.detailStacks[APP.currentDetailStack][0].type && "PARENT" != _screen.type && (pop = false);
                APP.removeDetailScreen(APP.previousDetailScreen, pop);
            }
            APP.previousDetailScreen = _screen;
        }
    },
    removeDetailScreen: function(_screen, _pop) {
        if (_screen) {
            APP.Detail[APP.currentStack].remove(_screen);
            APP.previousDetailScreen = null;
            if (_pop) {
                var stack = APP.detailStacks[APP.currentDetailStack];
                stack.splice(0, stack.length - 1);
            }
        }
    },
    openSettings: function() {
        APP.log("debug", "APP.openSettings");
        APP.addChild("settings", {}, true);
    },
    openPhoto: function() {
        APP.log("debug", "APP.openPhoto");
        APP.addChild("actions", {}, false);
    },
    closeSettings: function() {
        APP.modalStack.length > 0 && APP.removeChild(true);
    },
    toggleMenu: function() {
        APP.SlideMenuOpen ? APP.closeMenu() : APP.openMenu();
    },
    toggleMenuRight: function() {
        APP.SlideMenuRightOpen ? APP.closeMenuRight() : APP.openMenuRight();
    },
    openMenu: function() {
        APP.SlideMenu.Wrapper.left = "0dp";
        APP.SlideMenu.Wrapper.zIndex = 3;
        APP.GlobalWrapper.animate({
            left: "80%",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        APP.SlideMenuOpen = true;
    },
    closeMenu: function() {
        APP.GlobalWrapper.animate({
            left: "0dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        }, function() {
            APP.SlideMenu.Wrapper.zIndex = 0;
        });
        APP.SlideMenuOpen = false;
    },
    openMenuRight: function() {
        APP.SlideMenuRight.Wrapper.right = "0dp";
        APP.SlideMenuRight.Wrapper.zIndex = 3;
        APP.GlobalWrapper.animate({
            left: "-80%",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        APP.SlideMenuRightOpen = true;
    },
    closeMenuRight: function() {
        APP.GlobalWrapper.animate({
            left: "0dp",
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        }, function() {
            APP.SlideMenuRight.Wrapper.zIndex = 0;
        });
        APP.SlideMenuRightOpen = false;
    },
    openLoading: function() {
        APP.cancelLoading = false;
        setTimeout(function() {
            if (!APP.cancelLoading) {
                APP.loadingOpen = true;
                APP.GlobalWrapper.add(APP.Loading);
            }
        }, 100);
    },
    closeLoading: function() {
        APP.cancelLoading = true;
        if (APP.loadingOpen) {
            APP.GlobalWrapper.remove(APP.Loading);
            APP.loadingOpen = false;
        }
    },
    log: function(_severity, _text) {
        switch (_severity.toLowerCase()) {
          case "debug":
            Ti.API.debug(_text);
            break;

          case "error":
            Ti.API.error(_text);
            break;

          case "info":
            Ti.API.info(_text);
            break;

          case "log":
            Ti.API.log(_text);
            break;

          case "trace":
            Ti.API.trace(_text);
            break;

          case "warn":
            Ti.API.warn(_text);
        }
    },
    orientationObserver: function(_event) {
        APP.log("debug", "APP.orientationObserver");
        if (APP.Device.statusBarOrientation && APP.Device.statusBarOrientation == _event.orientation) return;
        APP.Device.statusBarOrientation = _event.orientation;
        APP.Device.orientation = _event.orientation == Ti.UI.LANDSCAPE_LEFT || _event.orientation == Ti.UI.LANDSCAPE_RIGHT ? "LANDSCAPE" : "PORTRAIT";
        Ti.App.fireEvent("APP:orientationChange");
    },
    networkObserver: function(_event) {
        APP.log("debug", "APP.networkObserver");
        APP.Network.type = _event.networkTypeName;
        APP.Network.online = _event.online;
        Ti.App.fireEvent("APP:networkChange");
    },
    exitObserver: function() {
        APP.log("debug", "APP.exitObserver");
    },
    resumeObserver: function() {
        APP.log("debug", "APP.resumeObserver");
        APP.eventsOpen.fetchEvents();
    },
    backButtonObserver: function() {
        APP.log("debug", "APP.backButtonObserver");
        if (APP.modalStack.length > 0) {
            APP.removeChild(true);
            return;
        }
        var stack;
        stack = APP.Device.isHandheld || !APP.hasDetail ? APP.controllerStacks[APP.currentStack] : APP.detailStacks[APP.currentDetailStack];
        stack.length > 1 ? APP.removeChild() : APP.MainWindow.close();
    }
};

module.exports = APP;