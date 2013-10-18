function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profilePage";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        backgroundColor: "#F3F3F3",
        layout: "vertical",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.NavigationBar = Alloy.createWidget("com.chariti.navigationBar", "widget", {
        id: "NavigationBar",
        image: "duppp.png",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        layout: "vertical"
    });
    $.__views.Wrapper.add($.__views.scrollView);
    $.__views.__alloyId10 = Ti.UI.createView({
        backgroundColor: "#0679FF",
        height: 107,
        layout: "horizontal",
        id: "__alloyId10"
    });
    $.__views.scrollView.add($.__views.__alloyId10);
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
    $.__views.__alloyId10.add($.__views.authorImage);
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
    $.__views.__alloyId10.add($.__views.author);
    $.__views.__alloyId11 = Ti.UI.createView({
        height: 107,
        layout: "horizontal",
        id: "__alloyId11"
    });
    $.__views.scrollView.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createView({
        height: 106,
        width: "50%",
        backgroundColor: "#F39C12",
        layout: "vertical",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.followerCount = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 62,
            fontFamily: "Lato-Regular"
        },
        id: "followerCount"
    });
    $.__views.__alloyId12.add($.__views.followerCount);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 15,
            fontFamily: "Lato-Regular"
        },
        text: "follower",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createView({
        height: 106,
        width: "50%",
        backgroundColor: "#E74C3C",
        layout: "vertical",
        id: "__alloyId14"
    });
    $.__views.__alloyId11.add($.__views.__alloyId14);
    $.__views.eventCount = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 62,
            fontFamily: "Lato-Regular"
        },
        id: "eventCount"
    });
    $.__views.__alloyId14.add($.__views.eventCount);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 15,
            fontFamily: "Lato-Regular"
        },
        text: "events",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.table = Ti.UI.createTableView({
        id: "table",
        allowsSelection: "false",
        scrollable: "false"
    });
    $.__views.scrollView.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var CONFIG = arguments[0] || {};
    var drupalServices = require("drupalServices");
    $.init = function() {
        APP.log("debug", "profile.init | " + JSON.stringify(CONFIG));
        $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");
        $.authorImage.image = CONFIG.field_avatar;
        $.followerCount.text = CONFIG.follower_count;
        APP.Device.isHandheld && $.NavigationBar.showBack({
            callback: function() {
                APP.removeAllChildren();
            }
        });
        $.retrieveData();
    };
    $.retrieveData = function() {
        drupalServices.userRetrieve({
            uid: CONFIG.uid,
            success: function(data) {
                var value;
                value = data.user.is_flagged ? "Unfollow" : "Follow";
                $.NavigationBar.showFollow({
                    text: value,
                    callback: function() {
                        $.follow(value);
                    }
                });
                $.followerCount.text = data.user.follow_count;
                $.eventCount.text = data.user.event_count;
                $.author.text = data.user.name;
            },
            error: function() {
                alert("error");
            }
        });
        drupalServices.userNodesList({
            uid: CONFIG.uid,
            success: function(json) {
                $.handleData(json);
            },
            error: function() {
                alert("error");
            }
        });
    };
    $.handleData = function(_data) {
        APP.log("debug", "profile.handleData");
        var rows = [];
        _data.forEach(function(event) {
            if ("1" === event.field_event_closed_value) {
                var newsItem = Alloy.createController("eventRow", event).getView();
                rows.push(newsItem);
            }
        });
        $.table.setData(rows);
        var height = 200 * rows.length;
        $.table.setHeight(height);
    };
    $.follow = function(value) {
        var data;
        data = "Follow" === value ? {
            action: "flag"
        } : {
            action: "unflag"
        };
        drupalServices.followUser({
            node: data,
            uid: CONFIG.uid,
            success: function() {
                $.NavigationBar.rightLabel.title = "Follow" === value ? "Unfollow" : "Follow";
            },
            error: function() {
                alert("error");
            }
        });
    };
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;