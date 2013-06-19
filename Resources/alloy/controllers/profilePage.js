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
            uid: args.uid,
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
    $.__views.__alloyId22 = Ti.UI.createView({
        backgroundColor: "#0679FF",
        height: 107,
        layout: "horizontal",
        id: "__alloyId22"
    });
    $.__views.scrollView.add($.__views.__alloyId22);
    $.__views.authorImage = Ti.UI.createImageView({
        borderRadius: 43,
        borderWidth: 4,
        borderColor: "#3892E3",
        top: 8,
        right: 10,
        left: 7,
        height: 90,
        width: 90,
        id: "authorImage"
    });
    $.__views.__alloyId22.add($.__views.authorImage);
    $.__views.author = Ti.UI.createLabel({
        color: "FFF",
        font: {
            fontSize: 35,
            fontFamily: "Helvetica Neue"
        },
        shadowColor: "#444",
        shadowOffset: {
            x: 1,
            y: 1
        },
        id: "author"
    });
    $.__views.__alloyId22.add($.__views.author);
    $.__views.__alloyId23 = Ti.UI.createView({
        height: 107,
        layout: "horizontal",
        id: "__alloyId23"
    });
    $.__views.scrollView.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createView({
        height: 106,
        width: "50%",
        backgroundColor: "#F39C12",
        layout: "vertical",
        id: "__alloyId24"
    });
    $.__views.__alloyId23.add($.__views.__alloyId24);
    $.__views.followerCount = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 62,
            fontFamily: "Helvetica Neue"
        },
        id: "followerCount"
    });
    $.__views.__alloyId24.add($.__views.followerCount);
    $.__views.__alloyId25 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 15,
            fontFamily: "Helvetica Neue"
        },
        text: "follower",
        id: "__alloyId25"
    });
    $.__views.__alloyId24.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createView({
        height: 106,
        width: "50%",
        backgroundColor: "#E74C3C",
        layout: "vertical",
        id: "__alloyId26"
    });
    $.__views.__alloyId23.add($.__views.__alloyId26);
    $.__views.eventCount = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 62,
            fontFamily: "Helvetica Neue"
        },
        id: "eventCount"
    });
    $.__views.__alloyId26.add($.__views.eventCount);
    $.__views.__alloyId27 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 15,
            fontFamily: "Helvetica Neue"
        },
        text: "events",
        id: "__alloyId27"
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    $.__views.follow = Ti.UI.createButton({
        id: "follow",
        title: "Follow"
    });
    $.__views.scrollView.add($.__views.follow);
    follow ? $.__views.follow.addEventListener("click", follow) : __defers["$.__views.follow!click!follow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var drupalServices = require("drupalServices"), args = arguments[0] || {};
    $.profilePage.addEventListener("open", function() {
        $.authorImage.image = args.field_avatar;
        $.followerCount.text = args.follower_count;
        drupalServices.userRetrieve({
            uid: args.uid,
            success: function(user) {
                $.follow.title = user[0].is_flagged ? "Unfollow" : "Follow";
                $.followerCount.text = user[0].follow_count;
                $.eventCount.text = user[0].event_count;
                $.author.text = user[0].name;
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