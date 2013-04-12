function Controller() {
    function createEvent() {
        if (Titanium.App.Properties.getInt("userUid")) {
            var user = {
                uid: Titanium.App.Properties.getInt("userUid"),
                sessid: Titanium.App.Properties.getString("userSessionId"),
                session_name: Titanium.App.Properties.getString("userSessionName"),
                name: Titanium.App.Properties.getString("userName")
            }, node = {
                node: {
                    title: $.textArea.value,
                    type: "event",
                    language: "und",
                    group_access: {
                        und: "0"
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
                }
            }, url = REST_PATH + "/node";
            ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(node),
                dataType: "json",
                contentType: "application/json",
                success: function(data) {
                    $.eventFormWindow.close({
                        animated: !0
                    });
                    Titanium.API.fireEvent("eventCreated");
                }
            });
        } else alert("You need to login first");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.eventFormWindow = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#3B9DCB",
        backgroundColor: "#F3F3F3",
        tabBarHidden: !0,
        id: "eventFormWindow",
        title: "New event",
        layout: "vertical"
    });
    $.addTopLevelView($.__views.eventFormWindow);
    $.__views.textArea = Ti.UI.createTextArea({
        font: {
            fontSize: 13,
            font: "HelveticaNeue"
        },
        color: "#888",
        id: "textArea",
        borderWidth: "1",
        borderColor: "#bbb",
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        textAlign: "left",
        value: "You have to type the title",
        top: "0",
        width: Titanium.UI.FILL,
        height: "150"
    });
    $.__views.eventFormWindow.add($.__views.textArea);
    $.__views.scrollView = Ti.UI.createScrollView({
        barImage: "bgNavBar.png",
        barColor: "#3B9DCB",
        backgroundColor: "#F3F3F3",
        tabBarHidden: !0,
        id: "scrollView",
        top: "0",
        contentWidth: "300",
        layout: "horizontal"
    });
    $.__views.eventFormWindow.add($.__views.scrollView);
    $.__views.__alloyId0 = Ti.UI.createView({
        id: "__alloyId0"
    });
    $.__views.scrollView.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createImageView({
        height: 106.5,
        width: 106.5,
        image: "http://stage.duppp.com/medias/eventmedia/1521/preview.jpg",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createImageView({
        height: 106.5,
        width: 106.5,
        image: "http://stage.duppp.com/medias/eventmedia/1523/preview.jpg",
        id: "__alloyId2"
    });
    $.__views.scrollView.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createImageView({
        height: 106.5,
        width: 106.5,
        image: "http://stage.duppp.com/medias/eventmedia/1524/preview.jpg",
        id: "__alloyId3"
    });
    $.__views.scrollView.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createImageView({
        height: 106.5,
        width: 106.5,
        image: "http://stage.duppp.com/medias/eventmedia/1525/preview.jpg",
        id: "__alloyId4"
    });
    $.__views.scrollView.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createImageView({
        height: 106.5,
        width: 106.5,
        image: "http://stage.duppp.com/medias/eventmedia/1510/preview.jpg",
        id: "__alloyId5"
    });
    $.__views.scrollView.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createImageView({
        height: 106.5,
        width: 106.5,
        image: "http://stage.duppp.com/medias/eventmedia/1511/preview.jpg",
        id: "__alloyId6"
    });
    $.__views.scrollView.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createImageView({
        height: 106.5,
        width: 106.5,
        image: "http://stage.duppp.com/medias/eventmedia/1512/preview.jpg",
        id: "__alloyId7"
    });
    $.__views.scrollView.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createImageView({
        height: 106.5,
        width: 106.5,
        image: "http://stage.duppp.com/medias/eventmedia/1513/preview.jpg",
        id: "__alloyId8"
    });
    $.__views.scrollView.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createImageView({
        height: 106.5,
        width: 106.5,
        image: "http://stage.duppp.com/medias/eventmedia/1514/preview.jpg",
        id: "__alloyId9"
    });
    $.__views.scrollView.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createImageView({
        height: 106.5,
        width: 106.5,
        image: "http://stage.duppp.com/medias/eventmedia/1515/preview.jpg",
        id: "__alloyId10"
    });
    $.__views.scrollView.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createImageView({
        height: 106.5,
        width: 106.5,
        image: "http://stage.duppp.com/medias/eventmedia/1516/preview.jpg",
        id: "__alloyId11"
    });
    $.__views.scrollView.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createImageView({
        height: 106.5,
        width: 106.5,
        image: "http://stage.duppp.com/medias/eventmedia/1517/preview.jpg",
        id: "__alloyId12"
    });
    $.__views.scrollView.add($.__views.__alloyId12);
    $.__views.__alloyId14 = Ti.UI.createButton({
        title: "OK",
        id: "__alloyId14"
    });
    createEvent ? $.__views.__alloyId14.addEventListener("click", createEvent) : __defers["$.__views.__alloyId14!click!createEvent"] = !0;
    $.__views.eventFormWindow.rightNavButton = $.__views.__alloyId14;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    Ti.include("tiajax.js");
    var ajax = Titanium.Network.ajax;
    $.textArea.addEventListener("focus", function() {
        $.textArea.value = "";
    });
    __defers["$.__views.__alloyId14!click!createEvent"] && $.__views.__alloyId14.addEventListener("click", createEvent);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;