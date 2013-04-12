function Controller() {
    function like() {
        if ($.like.title === "Like") var data = {
            action: "flag",
            flag_name: "like"
        }; else var data = {
            action: "unflag",
            flag_name: "like"
        };
        ajax({
            type: "POST",
            url: urlLike,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(data) {
                $.like.title === "Like" ? $.like.title = "Unlike" : $.like.title = "Like";
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.eventPage = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#3B9DCB",
        backgroundColor: "#F3F3F3",
        id: "eventPage"
    });
    $.addTopLevelView($.__views.eventPage);
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
    $.__views.__alloyId15 = Ti.UI.createButton({
        backgroundImage: "none",
        borderRadius: 0,
        color: "white",
        font: {
            fontSize: 14,
            fontFamily: "Helvetica Neue"
        },
        height: 20,
        left: 3,
        right: 3,
        width: 100,
        backgroundColor: "#1193FC",
        title: "Comments",
        id: "__alloyId15"
    });
    $.__views.actionBtns.add($.__views.__alloyId15);
    $.__views.like = Ti.UI.createButton({
        backgroundImage: "none",
        borderRadius: 0,
        color: "white",
        font: {
            fontSize: 14,
            fontFamily: "Helvetica Neue"
        },
        height: 20,
        left: 3,
        right: 3,
        width: 100,
        backgroundColor: "#EF5351",
        id: "like",
        title: "Like"
    });
    $.__views.actionBtns.add($.__views.like);
    like ? $.__views.like.addEventListener("click", like) : __defers["$.__views.like!click!like"] = !0;
    $.__views.__alloyId16 = Ti.UI.createButton({
        backgroundImage: "none",
        borderRadius: 0,
        color: "white",
        font: {
            fontSize: 14,
            fontFamily: "Helvetica Neue"
        },
        height: 20,
        left: 3,
        right: 3,
        width: 100,
        backgroundColor: "#7CCD2F",
        title: "Extra",
        id: "__alloyId16"
    });
    $.__views.actionBtns.add($.__views.__alloyId16);
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
    var data = [], url = REST_PATH + "/event/" + args.nid + ".json", urlLike = REST_PATH + "/event/" + args.nid + "/flag", ajax = Titanium.Network.ajax, xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            var json = JSON.parse(this.responseText);
            json.is_flagged ? $.like.title = "Unlike" : $.like.title = "Like";
            json.like_count.count ? $.likeCount.text = "Likes " + json.like_count.count : $.likeCount.text = "Likes 0";
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
        timeout: 5000
    });
    $.eventPage.addEventListener("open", function() {
        xhr.open("GET", url);
        xhr.send();
    });
    __defers["$.__views.like!click!like"] && $.__views.like.addEventListener("click", like);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;