function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.view = Ti.UI.createView({
        height: 200,
        bottom: -170,
        id: "view",
        layout: "vertical"
    });
    $.addTopLevelView($.__views.view);
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
        height: 20,
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
        text: "0"
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
    var url = REST_PATH + "/event.json?type=my_events", dupppUpload = require("duppp_upload"), data = [], xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            data = [];
            json = JSON.parse(this.responseText);
            json.forEach(function(event) {
                if (event.field_event_closed === "0") {
                    var newsItem = Alloy.createController("eventOpenRow", event).getView();
                    data.push(newsItem);
                }
            });
            $.labelOpen.text = data.length + " events in progress";
            $.table.setData(data);
            Titanium.UI.iPhone.setAppBadge(data.length);
            $.activityIndicator.hide();
            $.labelOpen.show();
        },
        onerror: function(e) {
            alert("error");
        },
        timeout: 5000
    });
    $.labelOpen.hide();
    $.activityIndicator.show();
    xhr.open("GET", url);
    xhr.send();
    Titanium.App.addEventListener("resume", function() {
        $.labelOpen.hide();
        $.activityIndicator.show();
        dupppUpload.processUpload();
        xhr.open("GET", url);
        xhr.send();
    });
    Titanium.API.addEventListener("eventCreated", function(data) {
        $.labelOpen.hide();
        $.activityIndicator.show();
        xhr.open("GET", url);
        xhr.send();
    });
    Titanium.API.addEventListener("startUpload", function(data) {
        $.view.animate({
            bottom: -150,
            duration: 200
        });
        $.provressView.show();
        $.pb.show();
    });
    Titanium.API.addEventListener("uploadInProgress", function(data) {
        $.provressViewLabel.text = dupppUpload.mediaQueue.length + 1 + " video";
        $.pb.setValue(data.progressValue * 100);
    });
    Titanium.API.addEventListener("uploadFinish", function(data) {
        $.view.animate({
            bottom: -170,
            duration: 200
        });
        $.provressView.hide();
        $.pb.hide();
        $.pb.setValue(0);
    });
    $.viewLabel.addEventListener("singletap", function(e) {
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

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;