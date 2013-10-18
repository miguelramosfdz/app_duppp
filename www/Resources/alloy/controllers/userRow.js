function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "userRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "row",
        layout: "horizontal"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.image = Ti.UI.createImageView({
        left: 5,
        right: 10,
        width: 45,
        top: 3,
        bottom: 3,
        height: 45,
        borderRadius: 2,
        id: "image",
        touchEnabled: "false"
    });
    $.__views.row.add($.__views.image);
    $.__views.name = Ti.UI.createLabel({
        color: "#34495E",
        font: {
            fontSize: 18,
            fontFamily: "Lato-Regular"
        },
        id: "name",
        touchEnabled: "false"
    });
    $.__views.row.add($.__views.name);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var CONFIG = arguments[0];
    $.name.text = CONFIG.name;
    $.image.image = 0 == CONFIG.field_avatar.length ? "" : CONFIG.field_avatar;
    $.row.uid = CONFIG.uid;
    $.row.name = CONFIG.name;
    $.row.field_avatar = CONFIG.field_avatar;
    CONFIG.isNoReturn || $.row.addEventListener("click", function() {
        APP.addChild("profilePage", CONFIG);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;