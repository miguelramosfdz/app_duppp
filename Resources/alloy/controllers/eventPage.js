function Controller() {
    function close() {
        $.eventPage.close();
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
        url: "http://stage.duppp.com/medias/eventmedia/1471/videofinale.mp4",
        height: "300",
        width: "320",
        backgroundColor: "black",
        autoplay: "false"
    });
    $.__views.scrollView.add($.__views.videoPlayer);
    $.__views.author_image = Ti.UI.createImageView({
        id: "author_image"
    });
    $.__views.scrollView.add($.__views.author_image);
    $.__views.author = Ti.UI.createLabel({
        id: "author",
        text: "author"
    });
    $.__views.scrollView.add($.__views.author);
    $.__views.f_title = Ti.UI.createLabel({
        id: "f_title",
        text: "title"
    });
    $.__views.scrollView.add($.__views.f_title);
    $.__views.f_date = Ti.UI.createLabel({
        id: "f_date",
        text: "date"
    });
    $.__views.scrollView.add($.__views.f_date);
    $.__views.menuBtn = Ti.UI.createButton({
        id: "menuBtn",
        title: "Close"
    });
    close ? $.__views.menuBtn.addEventListener("click", close) : __defers["$.__views.menuBtn!click!close"] = !0;
    $.__views.eventPage.leftNavButton = $.__views.menuBtn;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    var args = arguments[0] || {}, xhr2 = Titanium.Network.createHTTPClient(), getNode = REST_PATH + "/events/node/" + args + ".json";
    xhr2.open("GET", getNode);
    xhr2.send();
    xhr2.onload = function() {
        var userStatusCode = xhr2.status;
        if (userStatusCode == 200) {
            var nodeResponse = xhr2.responseText, node = JSON.parse(nodeResponse);
            $.f_date.text = moment.unix(node.created).fromNow();
            $.f_title.text = node.title;
            $.author_image.image = SITE_PATH + "/sites/default/files/styles/profil/public/pictures/" + user.picture.filename;
        }
    };
    __defers["$.__views.menuBtn!click!close"] && $.__views.menuBtn.addEventListener("click", close);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;