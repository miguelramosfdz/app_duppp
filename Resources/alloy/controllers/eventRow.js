function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
    $.addTopLevelView($.__views.row);
    $.__views.cropView = Ti.UI.createView({
        height: 195,
        right: 0,
        width: Titanium.UI.FILL,
        left: 0,
        id: "cropView"
    });
    $.__views.row.add($.__views.cropView);
    $.__views.f_image = Ti.UI.createImageView({
        top: "-230",
        width: Titanium.UI.FILL,
        id: "f_image"
    });
    $.__views.cropView.add($.__views.f_image);
    $.__views.actions = Ti.UI.createView({
        backgroundImage: "infoBg.png",
        width: "100%",
        height: 80,
        top: 0,
        id: "actions",
        layout: "horizontal"
    });
    $.__views.row.add($.__views.actions);
    $.__views.__alloyId2 = Ti.UI.createImageView({
        top: 20,
        right: 20,
        height: 30,
        image: "love.png",
        id: "__alloyId2"
    });
    $.__views.actions.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createImageView({
        top: 20,
        right: 20,
        width: 32.5,
        image: "comment.png",
        id: "__alloyId3"
    });
    $.__views.actions.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createImageView({
        top: 20,
        right: 20,
        height: 30,
        image: "share.png",
        id: "__alloyId4"
    });
    $.__views.actions.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createImageView({
        top: 30,
        right: 20,
        width: 36,
        image: "extra.png",
        id: "__alloyId5"
    });
    $.__views.actions.add($.__views.__alloyId5);
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
    $.f_title.text = args.node_title;
    $.f_date.text = moment.unix(args.node_created).fromNow();
    $.author_image.image = args.avatar;
    $.author.text = args.user_name;
    $.f_image.image = "http://stage.duppp.com/medias/eventmedia/1471/preview.jpg";
    $.author_image.addEventListener("touchend", function(e) {
        var win = Alloy.createController("profilePage", args.uid).getView();
        win.title = $.author.text;
        win.open({
            modal: !0
        });
    });
    $.f_image.addEventListener("touchend", function(e) {
        var node = {
            nid: args.nid,
            user_name: args.user_name,
            avatar: args.avatar
        }, win = Alloy.createController("eventPage", node).getView();
        win.title = "Event";
        win.open({
            modal: !0
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