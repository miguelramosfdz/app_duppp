function Controller() {
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
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        layout: "vertical"
    });
    $.__views.profilePage.add($.__views.scrollView);
    $.__views.authorImage = Ti.UI.createImageView({
        id: "authorImage"
    });
    $.__views.scrollView.add($.__views.authorImage);
    $.__views.author = Ti.UI.createLabel({
        id: "author"
    });
    $.__views.scrollView.add($.__views.author);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    var args = arguments[0] || {}, url = REST_PATH + "/user/" + args + ".json", xhr = Ti.Network.createHTTPClient({
        onload: function() {
            var user = JSON.parse(this.responseText);
            console.log(user);
            $.author.text = user.name;
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
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;