function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "commentRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.caption = Ti.UI.createView({
        bottom: 10,
        height: Titanium.UI.SIZE,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT,
        left: 50,
        width: Titanium.UI.FILL,
        id: "caption",
        layout: "vertical"
    });
    $.__views.caption && $.addTopLevelView($.__views.caption);
    $.__views.name = Ti.UI.createLabel({
        font: {
            fontSize: 14,
            font: "HelveticaNeue",
            fontWeight: "semibold"
        },
        left: 0,
        id: "name"
    });
    $.__views.caption.add($.__views.name);
    $.__views.commentBody = Ti.UI.createLabel({
        font: {
            fontSize: 12,
            font: "HelveticaNeue"
        },
        left: 0,
        width: 250,
        id: "commentBody"
    });
    $.__views.caption.add($.__views.commentBody);
    $.__views.created = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            font: "HelveticaNeue"
        },
        right: 10,
        id: "created"
    });
    $.__views.caption.add($.__views.created);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.name.text = args.name;
    $.commentBody.text = args.comment_body.und[0].value;
    $.created.text = moment.unix(args.created).fromNow();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;