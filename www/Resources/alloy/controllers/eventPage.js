function Controller() {
    function like() {
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
    }
    function comment() {
        commentFormWin.open({
            modal: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "eventPage";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.eventPage = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#000",
        backgroundColor: "#F3F3F3",
        id: "eventPage"
    });
    $.__views.eventPage && $.addTopLevelView($.__views.eventPage);
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        layout: "vertical"
    });
    $.__views.eventPage.add($.__views.scrollView);
    $.__views.videoPlayer = Ti.Media.createVideoPlayer({
        id: "videoPlayer",
        ns: Ti.Media,
        top: "0",
        height: "300",
        width: "320",
        backgroundColor: "black",
        autoplay: "false"
    });
    $.__views.scrollView.add($.__views.videoPlayer);
    $.__views.caption = Ti.UI.createView({
        backgroundImage: "infoBgPage@2x.png",
        width: "100%",
        height: 80,
        top: -10,
        id: "caption"
    });
    $.__views.scrollView.add($.__views.caption);
    $.__views.author_image = Ti.UI.createImageView({
        borderRadius: 5,
        left: 5,
        top: 15,
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
        top: 13,
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
        top: 32,
        left: 70,
        id: "f_title"
    });
    $.__views.caption.add($.__views.f_title);
    $.__views.f_date = Ti.UI.createLabel({
        font: {
            fontSize: 11,
            font: "HelveticaNeue"
        },
        bottom: 2,
        right: 5,
        id: "f_date"
    });
    $.__views.caption.add($.__views.f_date);
    $.__views.actionBtns = Ti.UI.createView({
        top: 10,
        height: 30,
        id: "actionBtns",
        layout: "horizontal"
    });
    $.__views.scrollView.add($.__views.actionBtns);
    $.__views.__alloyId13 = Ti.UI.createButton({
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
        title: "Comments",
        id: "__alloyId13"
    });
    $.__views.actionBtns.add($.__views.__alloyId13);
    comment ? $.__views.__alloyId13.addEventListener("click", comment) : __defers["$.__views.__alloyId13!click!comment"] = true;
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
    like ? $.__views.like.addEventListener("click", like) : __defers["$.__views.like!click!like"] = true;
    $.__views.__alloyId14 = Ti.UI.createButton({
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
        title: "Extra",
        id: "__alloyId14"
    });
    $.__views.actionBtns.add($.__views.__alloyId14);
    $.__views.likeCount = Ti.UI.createLabel({
        bottom: 10,
        color: "#EF5250",
        font: {
            fontSize: 15,
            font: "HelveticaNeue",
            fontWeight: "bold"
        },
        left: 5,
        id: "likeCount"
    });
    $.__views.scrollView.add($.__views.likeCount);
    $.__views.commentCount = Ti.UI.createLabel({
        bottom: 10,
        color: "#0CA7FD",
        font: {
            fontSize: 15,
            font: "HelveticaNeue",
            fontWeight: "bold"
        },
        left: 5,
        id: "commentCount"
    });
    $.__views.scrollView.add($.__views.commentCount);
    $.__views.commentsList = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        id: "commentsList",
        layout: "vertical"
    });
    $.__views.scrollView.add($.__views.commentsList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.CFG.rest;
    var commentFormWin = Alloy.createController("commentForm").getView(), args = arguments[0] || {}, drupalServices = require("drupalServices");
    $.author.text = args.user_name;
    $.author_image.image = args.avatar;
    $.videoPlayer.url = args.video;
    $.f_title.text = args.title;
    $.f_date.text = args.created;
    $.videoPlayer.addEventListener("durationavailable", function() {
        6e5 > this.duration && $.videoPlayer.play();
    });
    $.eventPage.addEventListener("open", function() {
        drupalServices.nodeRetrieve({
            nid: args.nid,
            success: function(json) {
                Titanium.App.Properties.getInt("userUid") == json.uid;
                $.like.title = json.is_flagged ? "Unlike" : "Like";
                $.likeCount.text = json.like_count.count ? "Likes " + json.like_count.count : "Likes 0";
                $.commentCount.text = "Comments " + json.comment_count;
                for (var key in json.comments) {
                    var newsItem = Alloy.createController("commentRow", json.comments[key]).getView();
                    $.commentsList.add(newsItem);
                }
            }
        });
    });
    __defers["$.__views.__alloyId13!click!comment"] && $.__views.__alloyId13.addEventListener("click", comment);
    __defers["$.__views.like!click!like"] && $.__views.like.addEventListener("click", like);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;