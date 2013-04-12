function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.indexView = Ti.UI.createTabGroup({
        id: "indexView"
    });
    $.__views.__alloyId22 = Alloy.createController("activity", {
        id: "__alloyId22"
    });
    $.__views.indexView.addTab($.__views.__alloyId22.getViewEx({
        recurse: !0
    }));
    $.__views.__alloyId23 = Alloy.createController("myEvents", {
        id: "__alloyId23"
    });
    $.__views.indexView.addTab($.__views.__alloyId23.getViewEx({
        recurse: !0
    }));
    $.__views.__alloyId24 = Alloy.createController("explore", {
        id: "__alloyId24"
    });
    $.__views.indexView.addTab($.__views.__alloyId24.getViewEx({
        recurse: !0
    }));
    $.addTopLevelView($.__views.indexView);
    $.__views.__alloyId25 = Alloy.createController("user", {
        id: "__alloyId25"
    });
    $.addTopLevelView($.__views.__alloyId25);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var userLoginWin = Alloy.createController("user").getView(), eventsOpenWin = Alloy.createController("eventsOpen").getView();
    Titanium.App.Properties.getInt("userUid") ? $.indexView.open() : userLoginWin.open();
    userLoginWin.addEventListener("close", function() {
        $.indexView.open({
            transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        });
    });
    Titanium.API.addEventListener("clickMenuChild", function(data) {
        $.indexView.tabs[data.tab_id].active = !0;
    });
    Titanium.API.addEventListener("openAsNavigation", function(data) {
        $.indexView.activeTab.open(data.window);
    });
    $.indexView.add(eventsOpenWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;