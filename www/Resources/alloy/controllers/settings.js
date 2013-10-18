function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        backgroundColor: "#F3F3F3",
        layout: "vertical",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.NavigationBar = Alloy.createWidget("com.chariti.navigationBar", "widget", {
        id: "NavigationBar",
        image: "duppp.png",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.tableWrapper = Ti.UI.createView({
        id: "tableWrapper"
    });
    $.__views.Wrapper.add($.__views.tableWrapper);
    $.__views.sectionFish = Ti.UI.createTableViewSection({
        id: "sectionFish",
        headerTitle: "Preferences"
    });
    var __alloyId16 = [];
    __alloyId16.push($.__views.sectionFish);
    $.__views.__alloyId17 = Ti.UI.createTableViewRow({
        color: "#2c3e50",
        backgroundColor: "#fff",
        font: {
            fontSize: 15,
            fontFamily: "Lato-Regular"
        },
        height: "50",
        title: "Send only in wifi",
        id: "__alloyId17"
    });
    $.__views.sectionFish.add($.__views.__alloyId17);
    $.__views.swWifi = Ti.UI.createSwitch({
        right: 10,
        value: false,
        id: "swWifi"
    });
    $.__views.__alloyId17.add($.__views.swWifi);
    $.__views.table = Ti.UI.createTableView({
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        backgroundColor: "#ecf0f1",
        data: __alloyId16,
        id: "table"
    });
    $.__views.tableWrapper.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var CONFIG = arguments[0];
    $.init = function() {
        APP.log("debug", "settings.init | " + JSON.stringify(CONFIG));
        "WIFI" == Ti.App.Properties.getString("sendConnection") && $.swWifi.setValue(true);
        $.swWifi.addEventListener("change", function(e) {
            1 == e.value ? Ti.App.Properties.setString("sendConnection", "WIFI") : Ti.App.Properties.setString("sendConnection", "3G");
        });
        $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");
        true === CONFIG.isChild && $.NavigationBar.showBack();
        if (APP.Settings.useSlideMenu) {
            $.NavigationBar.showMenu();
            $.NavigationBar.showCamera();
        } else $.NavigationBar.showSettings();
    };
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;