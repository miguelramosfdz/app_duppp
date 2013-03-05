function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.indexView = Ti.UI.createTabGroup({
        id: "indexView"
    });
    $.__views.__alloyId6 = Alloy.createController("myEvents", {
        id: "__alloyId6"
    });
    $.__views.indexView.addTab($.__views.__alloyId6.getViewEx({
        recurse: !0
    }));
    $.addTopLevelView($.__views.indexView);
    $.__views.__alloyId7 = Alloy.createController("user", {
        id: "__alloyId7"
    });
    $.addTopLevelView($.__views.__alloyId7);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var userLoginWin = Alloy.createController("user").getView();
    Titanium.App.Properties.getInt("userUid") ? $.indexView.open() : userLoginWin.open();
    userLoginWin.addEventListener("close", function() {
        $.indexView.open({
            transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;