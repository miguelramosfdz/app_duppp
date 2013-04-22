function Controller() {
    function follow() {
        var data;
        data = "Follow" === $.follow.title ? {
            action: "flag"
        } : {
            action: "unflag"
        };
        drupalServices.followUser({
            node: data,
            uid: args,
            success: function() {
                $.follow.title = "Follow" === $.follow.title ? "Unfollow" : "Follow";
            },
            error: function() {
                alert("error");
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
    var drupalServices = require("drupalServices");
    $.profilePage.addEventListener("open", function() {
        drupalServices.userRetrieve({
            uid: args,
            success: function(user) {
                $.follow.title = user.is_flagged ? "Unfollow" : "Follow";
                $.author.text = user.name;
            },
            error: function() {
                alert("error");
            }
        });
    });
    __defers["$.__views.follow!click!follow"] && $.__views.follow.addEventListener("click", follow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;