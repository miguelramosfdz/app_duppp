function Controller() {
    function like() {
        if ("Like" === $.like.title) {
            $.like.title = "Unlike";
            var data = {
                action: "flag",
                flag_name: "like"
            };
        } else {
            $.like.title = "Like";
            var data = {
                action: "unflag",
                flag_name: "like"
            };
        }
        ajax({
            type: "POST",
            url: urlLike,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function() {}
        });
    }
    function comment() {
        commentFormWin.open({
            modal: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.eventPage = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#3B9DCB",
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
        autoplay: "true"
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
    $.__views.__alloyId3 = Ti.UI.createButton({
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
        id: "__alloyId3"
    });
    $.__views.actionBtns.add($.__views.__alloyId3);
    comment ? $.__views.__alloyId3.addEventListener("click", comment) : __defers["$.__views.__alloyId3!click!comment"] = true;
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
    $.__views.__alloyId4 = Ti.UI.createButton({
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
        id: "__alloyId4"
    });
    $.__views.actionBtns.add($.__views.__alloyId4);
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
    Ti.include("config.js");
    Ti.include("tiajax.js");
    var args = arguments[0] || {};
    $.author.text = args.user_name;
    $.author_image.image = args.avatar;
    $.videoPlayer.url = args.video;
    $.f_title.text = args.title;
    $.f_date.text = args.created;
    var url = REST_PATH + "/event/" + args.nid + ".json", urlLike = REST_PATH + "/event/" + args.nid + "/flag", ajax = Titanium.Network.ajax, commentFormWin = Alloy.createController("commentForm").getView();
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            var json = JSON.parse(this.responseText);
            $.like.title = json.is_flagged ? "Unlike" : "Like";
            $.likeCount.text = json.like_count.count ? "Likes " + json.like_count.count : "Likes 0";
            $.commentCount.text = "Comments " + json.comment_count;
            for (var key in json.comments) {
                var newsItem = Alloy.createController("commentRow", json.comments[key]).getView();
                $.commentsList.add(newsItem);
            }
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
            alert("error");
        },
        timeout: 5e3
    });
    $.eventPage.addEventListener("open", function() {
        xhr.open("GET", url);
        xhr.send();
    });
    __defers["$.__views.__alloyId3!click!comment"] && $.__views.__alloyId3.addEventListener("click", comment);
    __defers["$.__views.like!click!like"] && $.__views.like.addEventListener("click", like);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;