function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "eventRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        height: Titanium.UI.SIZE,
        id: "row",
        layout: "vertical"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.caption = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 50,
        id: "caption"
    });
    $.__views.row.add($.__views.caption);
    $.__views.author_image = Ti.UI.createImageView({
        borderRadius: 5,
        left: 5,
        top: 5,
        width: 40,
        height: 40,
        id: "author_image"
    });
    $.__views.caption.add($.__views.author_image);
    $.__views.author = Ti.UI.createLabel({
        font: {
            fontSize: 14,
            font: "Lato-Regular"
        },
        top: 15,
        left: 50,
        id: "author"
    });
    $.__views.caption.add($.__views.author);
    $.__views.f_date = Ti.UI.createLabel({
        font: {
            fontSize: 14,
            font: "Lato-Light"
        },
        top: 15,
        right: 5,
        id: "f_date"
    });
    $.__views.caption.add($.__views.f_date);
    $.__views.media = Ti.UI.createView({
        height: 250,
        width: Titanium.UI.FILL,
        backgroundColor: "#FFF",
        id: "media"
    });
    $.__views.row.add($.__views.media);
    $.__views.thumbnail = Ti.UI.createImageView({
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        id: "thumbnail"
    });
    $.__views.media.add($.__views.thumbnail);
    $.__views.__alloyId7 = Ti.UI.createView({
        top: 5,
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId7"
    });
    $.__views.row.add($.__views.__alloyId7);
    $.__views.f_title = Ti.UI.createLabel({
        font: {
            fontSize: 12,
            font: "Lato-Light"
        },
        left: 5,
        id: "f_title"
    });
    $.__views.__alloyId7.add($.__views.f_title);
    $.__views.actionBtns = Ti.UI.createView({
        top: 5,
        height: 30,
        bottom: 20,
        id: "actionBtns",
        layout: "horizontal"
    });
    $.__views.row.add($.__views.actionBtns);
    $.__views.comment = Ti.UI.createButton({
        backgroundImage: "none",
        borderRadius: 0,
        color: "white",
        font: {
            fontSize: 15,
            fontFamily: "Helvetica Neue"
        },
        height: 25,
        left: 3,
        right: 3,
        width: 100,
        backgroundColor: "#1193FC",
        id: "comment",
        title: "Comment"
    });
    $.__views.actionBtns.add($.__views.comment);
    $.__views.like = Ti.UI.createButton({
        backgroundImage: "none",
        borderRadius: 0,
        color: "white",
        font: {
            fontSize: 15,
            fontFamily: "Helvetica Neue"
        },
        height: 25,
        left: 3,
        right: 3,
        width: 100,
        backgroundColor: "#EF5351",
        id: "like",
        title: "Like"
    });
    $.__views.actionBtns.add($.__views.like);
    $.__views.extra = Ti.UI.createButton({
        backgroundImage: "none",
        borderRadius: 0,
        color: "white",
        font: {
            fontSize: 15,
            fontFamily: "Helvetica Neue"
        },
        height: 25,
        left: 3,
        right: 3,
        width: 100,
        backgroundColor: "#7CCD2F",
        id: "extra",
        title: "Extra"
    });
    $.__views.actionBtns.add($.__views.extra);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var APP = require("core");
    var videoPlayer;
    var drupalServices = require("drupalServices");
    var dialog;
    $.f_title.text = args.title;
    $.f_date.text = args.created;
    $.author_image.image = 0 == args.field_avatar.length ? "" : args.field_avatar;
    $.author.text = args.name;
    $.thumbnail.image = 0 == args.video_thumbnail.length ? "" : args.video_thumbnail;
    $.init = function() {
        $.initDialog();
    };
    $.author_image.addEventListener("singletap", function() {
        APP.addChild("profilePage", args);
    });
    $.thumbnail.addEventListener("singletap", function() {
        videoPlayer = Titanium.Media.createVideoPlayer({
            height: Ti.UI.FILL,
            width: Ti.UI.FILL,
            backgroundColor: "#FFF"
        });
        videoPlayer.url = 0 == args.field_event_video_final.length ? "" : args.field_event_video_final;
        $.media.remove($.thumbnail);
        $.media.add(videoPlayer);
        videoPlayer.play();
        videoPlayer.addEventListener("complete", function() {
            $.media.remove(videoPlayer);
            $.media.add($.thumbnail);
        });
    });
    $.comment.addEventListener("click", function() {
        APP.addChild("commentForm", args, true);
    });
    $.like.addEventListener("click", function() {
        $.addLike();
    });
    $.extra.addEventListener("click", function() {
        dialog.show();
    });
    $.addLike = function() {
        var data;
        if ("Like" === $.like.title) {
            $.like.title = "Unlike";
            data = {
                action: "flag",
                flag_name: "like"
            };
        } else {
            $.like.title = "Like";
            data = {
                action: "unflag",
                flag_name: "like"
            };
        }
        drupalServices.likeNode({
            node: data,
            nid: args.nid
        });
    };
    $.initDialog = function() {
        var options = [];
        var mapping = [];
        options.push("Share with users");
        mapping.push("share_users");
        options.push("Cancel");
        mapping.push("cancel");
        dialog = Ti.UI.createOptionDialog({
            options: options,
            cancel: options.length - 1,
            selectedIndex: options.length - 1
        });
        dialog.addEventListener("click", function(_event) {
            switch (mapping[_event.index]) {
              case "share_users":
                APP.addChild("share", args);
            }
        });
    };
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;