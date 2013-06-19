function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.indexView = Ti.UI.createTabGroup({
        id: "indexView"
    });
    $.__views.__alloyId11 = Alloy.createController("activity", {
        id: "__alloyId11"
    });
    $.__views.indexView.addTab($.__views.__alloyId11.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId12 = Alloy.createController("myEvents", {
        id: "__alloyId12"
    });
    $.__views.indexView.addTab($.__views.__alloyId12.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId13 = Alloy.createController("explore", {
        id: "__alloyId13"
    });
    $.__views.indexView.addTab($.__views.__alloyId13.getViewEx({
        recurse: true
    }));
    $.__views.indexView && $.addTopLevelView($.__views.indexView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var drupalServices = require("drupalServices"), userLoginWin = Alloy.createController("user").getView("userLogin"), eventsOpenWin = Alloy.createController("eventsOpen").getView();
    require("facebook");
    drupalServices.systemInfo({
        success: function(data) {
            0 !== data.user.uid ? $.indexView.open() : userLoginWin.open();
        },
        error: function() {
            alert("Error, contact the admin");
        }
    });
    Titanium.App.addEventListener("resume", function() {
        drupalServices.systemInfo({
            success: function(data) {
                0 !== data.user.uid ? $.indexView.open() : userLoginWin.open();
            },
            error: function() {
                alert("Error, contact the admin");
            }
        });
    });
    Titanium.API.addEventListener("user:login", function() {
        $.indexView.open({
            transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        });
        Titanium.API.fireEvent("index:open");
    });
    Titanium.API.addEventListener("clickMenuChild", function(data) {
        $.indexView.tabs[data.tab_id].active = true;
    });
    Titanium.API.addEventListener("openAsNavigation", function(data) {
        $.indexView.activeTab.open(data.window);
    });
    $.indexView.add(eventsOpenWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;