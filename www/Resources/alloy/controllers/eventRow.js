function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "eventRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.thumbnail = Ti.UI.createImageView({
        height: 200,
        width: Titanium.UI.FILL,
        id: "thumbnail"
    });
    $.__views.row.add($.__views.thumbnail);
    $.__views.caption = Ti.UI.createView({
        backgroundImage: "infoBg.png",
        width: "100%",
        height: 80,
        top: 0,
        id: "caption"
    });
    $.__views.row.add($.__views.caption);
    $.__views.author_image = Ti.UI.createImageView({
        borderRadius: 5,
        left: 5,
        top: 5,
        width: 60,
        height: 60,
        id: "author_image"
    });
    $.__views.caption.add($.__views.author_image);
    $.__views.author = Ti.UI.createLabel({
        font: {
            fontSize: 14,
            font: "HelveticaNeue",
            fontWeight: "semibold"
        },
        top: 3,
        left: 70,
        id: "author"
    });
    $.__views.caption.add($.__views.author);
    $.__views.__alloyId8 = Ti.UI.createView({
        width: 250,
        font: {
            fontSize: 12,
            font: "HelveticaNeue"
        },
        top: 22,
        left: 70,
        layout: "horizontal",
        id: "__alloyId8"
    });
    $.__views.caption.add($.__views.__alloyId8);
    $.__views.f_title = Ti.UI.createLabel({
        font: {
            fontSize: 12,
            font: "HelveticaNeue"
        },
        id: "f_title"
    });
    $.__views.__alloyId8.add($.__views.f_title);
    $.__views.f_date = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            font: "HelveticaNeue"
        },
        bottom: 12,
        right: 5,
        id: "f_date"
    });
    $.__views.caption.add($.__views.f_date);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var APP = require("core");
    $.f_title.text = args.title;
    $.f_date.text = args.created;
    $.author_image.image = 0 == args.field_avatar.length ? "" : args.field_avatar;
    $.author.text = args.name;
    $.thumbnail.image = 0 == args.video_thumbnail.length ? "" : args.video_thumbnail;
    $.author_image.addEventListener("singletap", function() {
        APP.addChild("profilePage", args);
    });
    $.thumbnail.addEventListener("singletap", function() {
        var node = {
            nid: args.nid,
            title: args.title,
            created: args.created,
            user_name: args.name,
            avatar: 0 == args.field_avatar.length ? "" : args.field_avatar,
            video: 0 == args.field_event_video_final.length ? "" : args.field_event_video_final,
            uid: args.uid
        };
        APP.addChild("eventPage", node);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;