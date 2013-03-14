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
            }, url = REST_PATH + "/events/node";
            ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(node),
                dataType: "json",
                contentType: "application/json",
                success: function(data) {
                    Titanium.API.fireEvent("refreshEvent");
                    $.eventFormWindow.close({
                        animated: !0
                    });
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
        clearOnEdit: !0,
        id: "textArea",
        borderWidth: "2",
        borderColor: "#bbb",
        borderRadius: "5",
        color: "#888",
        textAlign: "left",
        value: "I am a textarea",
        top: "60",
        width: "300",
        height: "70"
    });
    $.__views.eventFormWindow.add($.__views.textArea);
    $.__views.button = Ti.UI.createButton({
        id: "button",
        title: "Create",
        top: "10",
        width: "100",
        height: "50"
    });
    $.__views.eventFormWindow.add($.__views.button);
    createEvent ? $.__views.button.addEventListener("click", createEvent) : __defers["$.__views.button!click!createEvent"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    Ti.include("tiajax.js");
    var ajax = Titanium.Network.ajax;
    __defers["$.__views.button!click!createEvent"] && $.__views.button.addEventListener("click", createEvent);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;