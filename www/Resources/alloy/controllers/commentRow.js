function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "commentRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.rowComment = Ti.UI.createTableViewRow({
        id: "rowComment",
        layout: "vertical"
    });
    $.__views.rowComment && $.addTopLevelView($.__views.rowComment);
    $.__views.name = Ti.UI.createLabel({
        font: {
            fontSize: 14,
            font: "Lato-Regular"
        },
        left: 10,
        id: "name"
    });
    $.__views.rowComment.add($.__views.name);
    $.__views.commentBody = Ti.UI.createLabel({
        font: {
            fontSize: 12,
            font: "Lato-Regular"
        },
        left: 10,
        right: 10,
        id: "commentBody"
    });
    $.__views.rowComment.add($.__views.commentBody);
    $.__views.created = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            font: "Lato-Regular"
        },
        right: 10,
        id: "created"
    });
    $.__views.rowComment.add($.__views.created);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var CONFIG = arguments[0] || {};
    var moment = require("alloy/moment");
    $.name.text = CONFIG.name;
    $.commentBody.text = CONFIG.comment_body.und[0].value;
    $.created.text = moment.unix(CONFIG.created).fromNow();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;