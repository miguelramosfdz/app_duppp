function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.indexView = Ti.UI.createTabGroup({
        id: "indexView"
    });
    $.__views.__alloyId21 = Alloy.createController("activity", {
        id: "__alloyId21"
    });
    $.__views.indexView.addTab($.__views.__alloyId21.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId22 = Alloy.createController("myEvents", {
        id: "__alloyId22"
    });
    $.__views.indexView.addTab($.__views.__alloyId22.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId23 = Alloy.createController("explore", {
        id: "__alloyId23"
    });
    $.__views.indexView.addTab($.__views.__alloyId23.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId24 = Alloy.createController("configuration", {
        id: "__alloyId24"
    });
    $.__views.indexView.addTab($.__views.__alloyId24.getViewEx({
        recurse: true
    }));
    $.__views.indexView && $.addTopLevelView($.__views.indexView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var drupalServices = require("drupalServices"), userLoginWin = Alloy.createController("user").getView("userLogin"), eventsOpenWin = Alloy.createController("eventsOpen").getView();
    $.indexView.add(eventsOpenWin);
    Ti.API.addEventListener("app:registred", function() {
        $.indexView.open();
    });
    Ti.API.addEventListener("app:anonymous", function() {
        userLoginWin.open();
    });
    Ti.API.addEventListener("user:login", function() {
        drupalServices.getToken({
            success: function(token) {
                Ti.App.Properties.setString("token", token);
            },
            error: function() {
                alert("Error, contact the admin");
            }
        });
        $.indexView.open({
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        });
        Ti.API.fireEvent("index:open");
    });
    Ti.API.addEventListener("clickMenuChild", function(data) {
        $.indexView.tabs[data.tab_id].active = true;
    });
    Ti.API.addEventListener("openAsNavigation", function(data) {
        $.indexView.activeTab.open(data.window);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;