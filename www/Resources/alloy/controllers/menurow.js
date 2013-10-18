function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menurow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        selectedBackgroundColor: "#DDD",
        layout: "horizontal",
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.title = Ti.UI.createLabel({
        top: "10dp",
        left: "10dp",
        right: "10dp",
        height: "28dp",
        font: {
            fontSize: "18dp",
            fontWeight: "normal"
        },
        color: "#666",
        id: "title"
    });
    $.__views.row.add($.__views.title);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.title.text = args.title || "";
    $.row.customView = args.customView || "";
    $.row.customTitle = $.title;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;