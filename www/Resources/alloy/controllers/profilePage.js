function Controller() {
    function prepareData(data) {
        dataEvents = [];
        data.forEach(function(event) {
            if ("1" === event.field_event_closed_value) {
                var newsItem = Alloy.createController("eventRow", event).getView();
                dataEvents.push(newsItem);
            }
        });
        $.table.setData(dataEvents);
    }
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
        barColor: "#000",
        backgroundColor: "#F3F3F3",
        id: "profilePage"
    });
    $.__views.profilePage && $.addTopLevelView($.__views.profilePage);
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        layout: "vertical"
    });
    $.__views.profilePage.add($.__views.scrollView);
    $.__views.__alloyId29 = Ti.UI.createView({
        backgroundColor: "#0679FF",
        height: 107,
        layout: "horizontal",
        id: "__alloyId29"
    });
    $.__views.scrollView.add($.__views.__alloyId29);
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
    $.__views.__alloyId29.add($.__views.authorImage);
    $.__views.author = Ti.UI.createLabel({
        color: "FFF",
        font: {
            fontSize: 30,
            fontFamily: "Lato-Regular"
        },
        shadowColor: "#444",
        shadowOffset: {
            x: 1,
            y: 1
        },
        id: "author"
    });
    $.__views.__alloyId29.add($.__views.author);
    $.__views.__alloyId30 = Ti.UI.createView({
        height: 107,
        layout: "horizontal",
        id: "__alloyId30"
    });
    $.__views.scrollView.add($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createView({
        height: 106,
        width: "50%",
        backgroundColor: "#F39C12",
        layout: "vertical",
        id: "__alloyId31"
    });
    $.__views.__alloyId30.add($.__views.__alloyId31);
    $.__views.followerCount = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 62,
            fontFamily: "Lato-Regular"
        },
        id: "followerCount"
    });
    $.__views.__alloyId31.add($.__views.followerCount);
    $.__views.__alloyId32 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 15,
            fontFamily: "Lato-Regular"
        },
        text: "follower",
        id: "__alloyId32"
    });
    $.__views.__alloyId31.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createView({
        height: 106,
        width: "50%",
        backgroundColor: "#E74C3C",
        layout: "vertical",
        id: "__alloyId33"
    });
    $.__views.__alloyId30.add($.__views.__alloyId33);
    $.__views.eventCount = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 62,
            fontFamily: "Lato-Regular"
        },
        id: "eventCount"
    });
    $.__views.__alloyId33.add($.__views.eventCount);
    $.__views.__alloyId34 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 15,
            fontFamily: "Lato-Regular"
        },
        text: "events",
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    $.__views.table = Ti.UI.createTableView({
        id: "table",
        allowsSelection: "false"
    });
    $.__views.scrollView.add($.__views.table);
    $.__views.follow = Ti.UI.createButton({
        id: "follow",
        title: "Follow"
    });
    follow ? $.__views.follow.addEventListener("click", follow) : __defers["$.__views.follow!click!follow"] = true;
    $.__views.profilePage.rightNavButton = $.__views.follow;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var drupalServices = require("drupalServices"), args = arguments[0] || {};
    $.profilePage.addEventListener("open", function() {
        $.authorImage.image = args.field_avatar;
        $.followerCount.text = args.follower_count;
        $.profilePage.title = args.name;
        drupalServices.userRetrieve({
            uid: args.uid,
            success: function(data) {
                $.follow.title = data.user.is_flagged ? "Unfollow" : "Follow";
                $.followerCount.text = data.user.follow_count;
                $.eventCount.text = data.user.event_count;
                $.author.text = data.user.name;
            },
            error: function() {
                alert("error");
            }
        });
        drupalServices.userNodesList({
            uid: args.uid,
            success: function(json) {
                prepareData(json);
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