function Controller() {
    function follow() {
        if ("Follow" === $.follow.title) var data = {
            action: "flag"
        }; else var data = {
            action: "unflag"
        };
        ajax({
            type: "POST",
            url: urlFollow,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function() {
                $.follow.title = "Follow" === $.follow.title ? "Unfollow" : "Follow";
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.profilePage = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#3B9DCB",
        backgroundColor: "#F3F3F3",
        id: "profilePage"
    });
    $.__views.profilePage && $.addTopLevelView($.__views.profilePage);
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
    $.__views.follow = Ti.UI.createButton({
        id: "follow",
        title: "Follow"
    });
    $.__views.scrollView.add($.__views.follow);
    follow ? $.__views.follow.addEventListener("click", follow) : __defers["$.__views.follow!click!follow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    var args = arguments[0] || {};
    var url = REST_PATH + "/duppp_user/" + args + ".json", urlFollow = REST_PATH + "/duppp_user/" + args + "/flag", ajax = Titanium.Network.ajax;
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            var user = JSON.parse(this.responseText);
            $.follow.title = user.is_flagged ? "Unfollow" : "Follow";
            $.author.text = user.name;
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
            alert("error");
        },
        timeout: 5e3
    });
    $.profilePage.addEventListener("open", function() {
        xhr.open("GET", url);
        xhr.send();
    });
    __defers["$.__views.follow!click!follow"] && $.__views.follow.addEventListener("click", follow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;