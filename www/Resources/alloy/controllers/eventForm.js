function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "eventForm";
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
    $.__views.__alloyId2 = Ti.UI.createView({
        backgroundColor: "#ecf0f1",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId2"
    });
    $.__views.Wrapper.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        color: "#2c3e50",
        font: {
            fontSize: 17,
            fontFamily: "Lato-Regular"
        },
        left: 10,
        height: 50,
        width: "70%",
        text: "Description",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.textArea = Ti.UI.createTextArea({
        font: {
            fontSize: 15,
            fontFamily: "Lato-Regular"
        },
        id: "textArea",
        color: "#888",
        textAlign: "left",
        value: "You have to type the title",
        width: Titanium.UI.FILL,
        height: "150"
    });
    $.__views.Wrapper.add($.__views.textArea);
    $.__views.__alloyId4 = Ti.UI.createView({
        backgroundColor: "#ecf0f1",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId4"
    });
    $.__views.Wrapper.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        color: "#2c3e50",
        font: {
            fontSize: 17,
            fontFamily: "Lato-Regular"
        },
        left: 10,
        height: 50,
        width: "70%",
        text: "Private",
        id: "__alloyId5"
    });
    $.__views.__alloyId4.add($.__views.__alloyId5);
    $.__views.switchPrivate = Ti.UI.createSwitch({
        id: "switchPrivate",
        title: "Private",
        value: "0"
    });
    $.__views.__alloyId4.add($.__views.switchPrivate);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var CONFIG = arguments[0] || {};
    $.init = function() {
        APP.log("debug", "eventForm.init | " + JSON.stringify(CONFIG));
        $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");
        true === CONFIG.isChild && $.NavigationBar.showBack();
        if (APP.Settings.useSlideMenu) {
            $.NavigationBar.showMenu();
            $.NavigationBar.showNext({
                callback: function() {
                    var user = {
                        uid: Ti.App.Properties.getInt("userUid"),
                        sessid: Ti.App.Properties.getString("userSessionId"),
                        session_name: Ti.App.Properties.getString("userSessionName"),
                        name: Ti.App.Properties.getString("userName")
                    };
                    var switchPrivate;
                    switchPrivate = 1 == $.switchPrivate.value ? "1" : "0";
                    var node = {
                        type: "event",
                        title: $.textArea.value,
                        language: "und",
                        group_access: {
                            und: switchPrivate
                        },
                        field_event_date: {
                            und: [ {
                                show_todate: "0",
                                value: {
                                    month: "2",
                                    day: "14",
                                    year: "2013",
                                    hour: "20",
                                    minute: "15"
                                }
                            } ]
                        },
                        uid: user.uid,
                        status: 1
                    };
                    APP.addChild("eventFormStep2", node);
                }
            });
        } else $.NavigationBar.showSettings();
    };
    $.textArea.addEventListener("focus", function() {
        $.textArea.value = "";
    });
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;