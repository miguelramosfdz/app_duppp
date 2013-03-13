function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.indexView = Ti.UI.createTabGroup({
        id: "indexView"
    });
    $.__views.__alloyId7 = Alloy.createController("activity", {
        id: "__alloyId7"
    });
    $.__views.indexView.addTab($.__views.__alloyId7.getViewEx({
        recurse: !0
    }));
    $.__views.__alloyId8 = Alloy.createController("myEvents", {
        id: "__alloyId8"
    });
    $.__views.indexView.addTab($.__views.__alloyId8.getViewEx({
        recurse: !0
    }));
    $.addTopLevelView($.__views.indexView);
    $.__views.__alloyId9 = Alloy.createController("user", {
        id: "__alloyId9"
    });
    $.addTopLevelView($.__views.__alloyId9);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var userLoginWin = Alloy.createController("user").getView();
    Titanium.App.Properties.getInt("userUid") ? $.indexView.open() : userLoginWin.open();
    userLoginWin.addEventListener("close", function() {
        $.indexView.open({
            transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        });
    });
    Titanium.API.addEventListener("clickMenuChild", function(data) {
        $.indexView.tabs[data.tab_id].active = !0;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;