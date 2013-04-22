function Controller() {
    function fetchEvents() {
        drupalServices.nodeList({
            type: "my_events",
            success: function(json) {
                data = [];
                eventsRaw = [];
                json.forEach(function(event) {
                    if ("0" === event.field_event_closed) {
                        var newsItem = Alloy.createController("eventOpenRow", event).getView();
                        data.push(newsItem);
                        eventsRaw.push(event);
                    }
                });
                var events = {
                    data: eventsRaw
                };
                Titanium.API.fireEvent("myEvents:fetched", events);
                $.table.setData(data);
                $.labelOpen.text = data.length + " events in progress";
                $.activityIndicator.hide();
                $.labelOpen.show();
                Titanium.UI.iPhone.setAppBadge(data.length);
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
    $.__views.view = Ti.UI.createView({
        height: 200,
        bottom: -170,
        id: "view",
        layout: "vertical"
    });
    $.__views.view && $.addTopLevelView($.__views.view);
    $.__views.viewLabel = Ti.UI.createView({
        backgroundColor: "#D4D4D4",
        width: "50%",
        height: 30,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        zIndex: 1,
        id: "viewLabel"
    });
    $.__views.view.add($.__views.viewLabel);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        color: "#353535",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        id: "activityIndicator",
        message: "Loading ...",
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK
    });
    $.__views.viewLabel.add($.__views.activityIndicator);
    $.__views.labelOpen = Ti.UI.createLabel({
        color: "#353535",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        id: "labelOpen",
        text: "events in progress"
    });
    $.__views.viewLabel.add($.__views.labelOpen);
    $.__views.view2 = Ti.UI.createView({
        backgroundColor: "#D4D4D4",
        borderRadius: 3,
        width: Titanium.UI.FILL,
        id: "view2",
        layout: "vertical"
    });
    $.__views.view.add($.__views.view2);
    $.__views.provressView = Ti.UI.createView({
        height: 0,
        id: "provressView",
        visible: "false"
    });
    $.__views.view2.add($.__views.provressView);
    $.__views.provressViewLabel = Ti.UI.createLabel({
        left: 10,
        top: 0,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        id: "provressViewLabel",
        text: "0 video"
    });
    $.__views.provressView.add($.__views.provressViewLabel);
    $.__views.pb = Ti.UI.createProgressBar({
        backgroundColor: "#D4D4D4",
        style: Titanium.UI.iPhone.ProgressBarStyle.BAR,
        top: 3,
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
    $.__views.desc = Ti.UI.createLabel({
        color: "#353535",
        font: {
            fontSize: 14
        },
        top: 10,
        id: "desc",
        text: "You want to close and publish which event ?"
    });
    $.__views.view2.add($.__views.desc);
    $.__views.table = Ti.UI.createTableView({
        backgroundColor: "#D4D4D4",
        height: 130,
        top: 10,
        width: "95%",
        id: "table",
        allowsSelection: "false"
    });
    $.__views.view2.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var eventsRaw, dupppUpload = require("dupppUpload"), drupalServices = require("drupalServices"), data = [];
    $.labelOpen.hide();
    $.activityIndicator.show();
    Titanium.API.addEventListener("index:open", function() {
        fetchEvents();
    });
    Titanium.App.addEventListener("resume", function() {
        $.labelOpen.hide();
        $.activityIndicator.show();
        dupppUpload.processUpload();
        fetchEvents();
    });
    Titanium.API.addEventListener("eventCreated", function() {
        $.labelOpen.hide();
        $.activityIndicator.show();
        fetchEvents();
    });
    Titanium.API.addEventListener("startUpload", function() {
        $.provressView.height = 20;
        $.view.animate({
            bottom: -150,
            duration: 200
        });
        $.provressView.show();
        $.pb.show();
    });
    Titanium.API.addEventListener("uploadInProgress", function(data) {
        $.provressViewLabel.text = dupppUpload.mediaQueue.length + " video";
        $.pb.setValue(100 * data.progressValue);
    });
    Titanium.API.addEventListener("uploadFinish", function() {
        $.view.animate({
            bottom: -170,
            duration: 200
        });
        $.provressView.hide();
        $.pb.hide();
        $.provressView.height = 0;
        $.pb.setValue(0);
    });
    $.viewLabel.addEventListener("singletap", function() {
        $.view.animate({
            bottom: 0,
            duration: 500
        });
    });
    $.view.addEventListener("touchmove", function(e) {
        e.y > 0 && $.view.animate({
            bottom: -170,
            duration: 500
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;