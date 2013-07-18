function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.child_window = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#000",
        backgroundColor: "#F3F3F3",
        tabBarHidden: true,
        id: "child_window",
        title: "Configuration"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.child_window,
        id: "tab4",
        title: "Tab 4",
        icon: "KS_nav_views.png"
    });
    $.__views.tab4 && $.addTopLevelView($.__views.tab4);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var nav = (Alloy.CFG.rest, Alloy.createController("navActions")), uie = require("UiElements");
    require("drupalServices"), uie.createIndicatorWindow();
    $.child_window.setLeftNavButton(nav.getView("menuBtn"));
    $.child_window.setRightNavButton(nav.getView("cameraBtn"));
    $.child_window.add(nav.getView("tooltipContainer"));
    $.child_window.add(nav.getView("menu"));
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;