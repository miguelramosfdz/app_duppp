function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.child_window = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#3B9DCB",
        backgroundColor: "#F3F3F3",
        tabBarHidden: !0,
        id: "child_window",
        title: "Explore"
    });
    $.__views.table = Ti.UI.createTableView({
        id: "table",
        allowsSelection: "false"
    });
    $.__views.child_window.add($.__views.table);
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.child_window,
        id: "tab2",
        title: "Tab 2",
        icon: "KS_nav_views.png"
    });
    $.addTopLevelView($.__views.tab2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    var data = [], url = REST_PATH + "/event.json?type=activity", nav = Alloy.createController("navActions"), uie = require("UiElements"), indicator = uie.createIndicatorWindow();
    $.child_window.setLeftNavButton(nav.getView("menuBtn"));
    $.child_window.setRightNavButton(nav.getView("cameraBtn"));
    $.child_window.add(nav.getView("tooltipContainer"));
    $.child_window.add(nav.getView("menu"));
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;