function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "configuration";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.child_window = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#000",
        backgroundColor: "#F3F3F3",
        tabBarHidden: true,
        id: "child_window",
        title: "Options"
    });
    $.__views.sectionFish = Ti.UI.createTableViewSection({
        id: "sectionFish",
        headerTitle: "Preferences"
    });
    var __alloyId2 = [];
    __alloyId2.push($.__views.sectionFish);
    $.__views.__alloyId3 = Ti.UI.createTableViewRow({
        color: "#2c3e50",
        backgroundColor: "#fff",
        font: {
            fontSize: 15,
            fontFamily: "Lato-Regular"
        },
        height: "50",
        title: "Send only in wifi",
        id: "__alloyId3"
    });
    $.__views.sectionFish.add($.__views.__alloyId3);
    $.__views.swWifi = Ti.UI.createSwitch({
        right: 10,
        value: false,
        id: "swWifi"
    });
    $.__views.__alloyId3.add($.__views.swWifi);
    $.__views.table = Ti.UI.createTableView({
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        backgroundColor: "#ecf0f1",
        data: __alloyId2,
        id: "table"
    });
    $.__views.child_window.add($.__views.table);
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.child_window,
        id: "tab4",
        title: "Tab 4",
        icon: "KS_nav_views.png"
    });
    $.__views.tab4 && $.addTopLevelView($.__views.tab4);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var nav = Alloy.createController("navActions");
    $.child_window.setLeftNavButton(nav.getView("menuBtn"));
    $.child_window.setRightNavButton(nav.getView("cameraBtn"));
    $.child_window.add(nav.getView("tooltipContainer"));
    $.child_window.add(nav.getView("menu"));
    "WIFI" == Ti.App.Properties.getString("sendConnection") && $.swWifi.setValue(true);
    $.swWifi.addEventListener("change", function(e) {
        1 == e.value ? Ti.App.Properties.setString("sendConnection", "WIFI") : Ti.App.Properties.setString("sendConnection", "3G");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;