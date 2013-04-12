function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
    $.addTopLevelView($.__views.row);
    $.__views.thumbnail = Ti.UI.createImageView({
        height: 200,
        width: Titanium.UI.FILL,
        id: "thumbnail"
    });
    $.__views.row.add($.__views.thumbnail);
    $.__views.actions = Ti.UI.createView({
        backgroundImage: "infoBg.png",
        width: "100%",
        height: 80,
        top: 0,
        id: "actions",
        layout: "horizontal"
    });
    $.__views.row.add($.__views.actions);
    $.__views.__alloyId17 = Ti.UI.createImageView({
        top: 20,
        right: 20,
        height: 30,
        image: "love.png",
        id: "__alloyId17"
    });
    $.__views.actions.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createImageView({
        top: 20,
        right: 20,
        width: 32.5,
        image: "comment.png",
        id: "__alloyId18"
    });
    $.__views.actions.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createImageView({
        top: 20,
        right: 20,
        height: 30,
        image: "share.png",
        id: "__alloyId19"
    });
    $.__views.actions.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createImageView({
        top: 30,
        right: 20,
        width: 36,
        image: "extra.png",
        id: "__alloyId20"
    });
    $.__views.actions.add($.__views.__alloyId20);
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
    $.__views.f_title = Ti.UI.createLabel({
        width: 250,
        font: {
            fontSize: 12,
            font: "HelveticaNeue"
        },
        top: 22,
        left: 70,
        id: "f_title"
    });
    $.__views.caption.add($.__views.f_title);
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
    Ti.include("config.js");
    var args = arguments[0] || {};
    $.f_title.text = args.title;
    $.f_date.text = args.created;
    $.author_image.image = args.field_avatar.length == 0 ? "" : args.field_avatar;
    $.author.text = args.name;
    $.thumbnail.image = args.video_thumbnail.length == 0 ? "" : args.video_thumbnail;
    $.author_image.addEventListener("touchend", function(e) {
        var win = Alloy.createController("profilePage", args.uid).getView();
        win.title = $.author.text;
        Titanium.API.fireEvent("openAsNavigation", {
            window: win
        });
    });
    $.thumbnail.addEventListener("touchend", function(e) {
        var node = {
            nid: args.nid,
            title: args.title,
            created: args.created,
            user_name: args.name,
            avatar: args.field_avatar.length == 0 ? "" : args.field_avatar,
            video: args.field_event_video_final.length == 0 ? "" : args.field_event_video_final
        }, win = Alloy.createController("eventPage", node).getView();
        win.title = "Event";
        Titanium.API.fireEvent("openAsNavigation", {
            window: win
        });
    });
    var current_row;
    $.caption.addEventListener("swipe", function(e) {
        !current_row || $.caption.animate({
            right: 0,
            duration: 300
        });
        current_row = Ti.Platform.osname == "android" ? this : e.row;
        $.caption.animate({
            right: -340,
            duration: 300
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;