function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "eventsOpen";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.view = Ti.UI.createView({
        height: 20,
        bottom: -20,
        zIndex: 10,
        backgroundColor: "#2c3e50",
        id: "view",
        layout: "vertical"
    });
    $.__views.view && $.addTopLevelView($.__views.view);
    $.__views.provressView = Ti.UI.createView({
        id: "provressView",
        visible: "false"
    });
    $.__views.view.add($.__views.provressView);
    $.__views.provressViewLabel = Ti.UI.createLabel({
        left: 10,
        top: 0,
        font: {
            fontSize: 14,
            fontFamily: "Lato-Regular"
        },
        color: "#ecf0f1",
        id: "provressViewLabel",
        text: "0 video"
    });
    $.__views.provressView.add($.__views.provressViewLabel);
    $.__views.pb = Ti.UI.createProgressBar({
        backgroundColor: "#BDC3C7",
        style: Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
        top: 8,
        left: 65,
        width: "245",
        id: "pb",
        height: "auto",
        min: "0",
        max: "100",
        value: "0",
        color: "#000"
    });
    $.__views.provressView.add($.__views.pb);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var data, eventsRaw, drupalServices = require("drupalServices"), medias = APP.media;
    $.fetchEvents = function() {
        APP.Network.online && drupalServices.nodeList("my_events", "", function(json) {
            data = [];
            eventsRaw = [];
            json.forEach(function(event) {
                "0" === event.field_event_closed && eventsRaw.push(event);
            });
            var events = {
                data: eventsRaw
            };
            Ti.API.fireEvent("myEvents:fetched", events);
        }, function() {
            $.fetchEvents();
        });
    };
    Titanium.API.addEventListener("eventCreated", function() {
        $.fetchEvents();
    });
    Titanium.API.addEventListener("startUpload", function() {
        $.provressView.height = 20;
        $.view.animate({
            bottom: 0,
            duration: 200
        });
        $.provressView.show();
        $.pb.show();
    });
    Titanium.API.addEventListener("uploadInProgress", function(data) {
        $.provressViewLabel.text = medias.length + " video";
        $.pb.setValue(100 * data.progressValue);
    });
    Titanium.API.addEventListener("uploadFinish", function() {
        $.view.animate({
            bottom: -20,
            duration: 200
        });
        $.provressView.hide();
        $.pb.hide();
        $.provressView.height = 0;
        $.pb.setValue(0);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;