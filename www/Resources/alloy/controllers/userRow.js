function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
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
        id: "image"
    });
    $.__views.row.add($.__views.image);
    $.__views.name = Ti.UI.createLabel({
        color: "#34495E",
        font: {
            fontSize: 18,
            fontFamily: "Lato-Regular"
        },
        id: "name"
    });
    $.__views.row.add($.__views.name);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.name.text = args.name;
    $.image.image = 0 == args.field_avatar.length ? "" : args.field_avatar;
    $.row.uid = args.uid;
    args.isNoReturn || $.row.addEventListener("click", function() {
        var win = Alloy.createController("profilePage", args).getView();
        Titanium.API.fireEvent("openAsNavigation", {
            window: win
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;