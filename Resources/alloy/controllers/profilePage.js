function Controller() {
    function close() {
        $.profilePage.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.profilePage = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#3B9DCB",
        backgroundColor: "#F3F3F3",
        id: "profilePage"
    });
    $.addTopLevelView($.__views.profilePage);
    $.__views.printView = Ti.UI.createView({
        backgroundColor: "#F3F3F3",
        id: "printView",
        layout: "horizontal"
    });
    $.__views.profilePage.add($.__views.printView);
    $.__views.author_image = Ti.UI.createImageView({
        height: 106.6,
        width: 106.6,
        id: "author_image"
    });
    $.__views.printView.add($.__views.author_image);
    $.__views.author = Ti.UI.createLabel({
        id: "author"
    });
    $.__views.printView.add($.__views.author);
    $.__views.menuBtn = Ti.UI.createButton({
        id: "menuBtn",
        title: "Close"
    });
    close ? $.__views.menuBtn.addEventListener("click", close) : __defers["$.__views.menuBtn!click!close"] = !0;
    $.__views.profilePage.leftNavButton = $.__views.menuBtn;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    var args = arguments[0] || {}, url = REST_PATH + "/user/user/" + args + ".json", xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            json = JSON.parse(this.responseText);
            $.author_image.image = SITE_PATH + "/sites/default/files/styles/profil/public/pictures/" + user.avatar.filename;
            $.author.text = "@" + user.name;
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
            alert("error");
        },
        timeout: 5000
    });
    $.profilePage.addEventListener("open", function() {
        xhr.open("GET", url);
        xhr.send();
    });
    __defers["$.__views.menuBtn!click!close"] && $.__views.menuBtn.addEventListener("click", close);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;