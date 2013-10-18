function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.MainWindow = Ti.UI.createWindow(function() {
        var o = {};
        _.extend(o, {
            statusBarStyle: Ti.UI.iPhone.StatusBar.OPAQUE_BLACK,
            backgroundColor: "#EEE"
        });
        Alloy.isHandheld && _.extend(o, {
            orientationModes: [ Ti.UI.PORTRAIT ]
        });
        _.extend(o, {
            id: "MainWindow"
        });
        return o;
    }());
    $.__views.MainWindow && $.addTopLevelView($.__views.MainWindow);
    $.__views.SlideMenu = Alloy.createWidget("com.chariti.slideMenu", "widget", {
        id: "SlideMenu",
        __parentSymbol: $.__views.MainWindow
    });
    $.__views.SlideMenu.setParent($.__views.MainWindow);
    $.__views.SlideMenuRight = Alloy.createWidget("com.chariti.slideMenuRight", "widget", {
        id: "SlideMenuRight",
        __parentSymbol: $.__views.MainWindow
    });
    $.__views.SlideMenuRight.setParent($.__views.MainWindow);
    $.__views.GlobalWrapper = Ti.UI.createView({
        width: "100%",
        zIndex: 5,
        id: "GlobalWrapper"
    });
    $.__views.MainWindow.add($.__views.GlobalWrapper);
    $.__views.ContentWrapper = Ti.UI.createView({
        id: "ContentWrapper"
    });
    $.__views.GlobalWrapper.add($.__views.ContentWrapper);
    $.__views.Tabs = Alloy.createWidget("com.chariti.tabs", "widget", {
        id: "Tabs",
        __parentSymbol: $.__views.GlobalWrapper
    });
    $.__views.Tabs.setParent($.__views.GlobalWrapper);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    APP.MainWindow = $.MainWindow;
    APP.GlobalWrapper = $.GlobalWrapper;
    APP.ContentWrapper = $.ContentWrapper;
    APP.Tabs = $.Tabs;
    APP.SlideMenu = $.SlideMenu;
    APP.SlideMenuRight = $.SlideMenuRight;
    APP.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;