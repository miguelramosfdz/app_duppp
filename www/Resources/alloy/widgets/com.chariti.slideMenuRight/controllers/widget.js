function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.chariti.slideMenuRight/" + s : s.substring(0, index) + "/com.chariti.slideMenuRight/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("com.chariti.slideMenuRight");
    this.__widgetId = "com.chariti.slideMenuRight";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        width: "80%",
        top: "0dp",
        right: "-80%",
        backgroundColor: "#000",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.Tabs = Ti.UI.createTableView({
        top: "0dp",
        backgroundColor: "#111",
        separatorColor: "#222",
        separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE,
        id: "Tabs"
    });
    $.__views.Wrapper.add($.__views.Tabs);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var dupppUpload = require("dupppUpload");
    $.init = function() {};
    $.clear = function() {
        $.Tabs.setData([]);
    };
    $.setIndex = function(_index) {
        $.Tabs.selectRow(_index);
    };
    $.openCamera = function(nid) {
        var user = {
            uid: Ti.App.Properties.getInt("userUid"),
            sessid: Ti.App.Properties.getString("userSessionId"),
            session_name: Ti.App.Properties.getString("userSessionName"),
            name: Ti.App.Properties.getString("userName")
        };
        Ti.Media.showCamera({
            success: function(event) {
                dupppUpload.addFile(event.media, nid, new Date().getTime(), user.uid);
            },
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Video"
                });
                error.code == Titanium.Media.NO_VIDEO ? a.setMessage("Device does not have video recording capabilities") : a.setMessage("Unexpected error: " + error.code);
                a.show();
            },
            mediaTypes: Ti.Media.MEDIA_TYPE_VIDEO,
            videoQuality: Ti.Media.QUALITY_MEDIUM,
            showControls: true
        });
    };
    $.openForm = function() {
        Alloy.createController("eventForm").getView("eventFormWindow");
        APP.addChild("eventForm", {}, true);
    };
    $.addData = function(events) {
        $.tabs = [];
        var create = Ti.UI.createTableViewRow({
            height: "40dp",
            backgroundSelectedColor: "#27ae60",
            selectedBackgroundColor: "#27ae60"
        });
        var viewCreate = Ti.UI.createView({
            backgroundColor: "#40d47e",
            width: Ti.UI.FILL
        });
        var createLabel = Ti.UI.createLabel({
            text: "Create an Event",
            top: "0dp",
            height: "40dp",
            backgroundcolor: "#27ae60",
            font: {
                fontSize: "18dp",
                fontFamily: "Lato-Light"
            },
            color: "#2c3e50",
            touchEnabled: false
        });
        viewCreate.add(createLabel);
        create.add(viewCreate);
        $.tabs.push(create);
        var section1 = Ti.UI.createTableViewSection({
            headerTitle: "Events in progress"
        });
        $.tabs.push(section1);
        for (var i = 0; events.data.length > i; i++) {
            var tab = Ti.UI.createTableViewRow({
                height: "35dp",
                backgroundcolor: "#111",
                backgroundSelectedColor: "#222",
                selectedBackgroundColor: "#222",
                nid: events.data[i].nid
            });
            var label = Ti.UI.createLabel({
                text: events.data[i].title,
                top: "0dp",
                left: "10dp",
                right: "13dp",
                height: "35dp",
                font: {
                    fontSize: "16dp",
                    fontFamily: "Lato-Light"
                },
                color: "#FFF",
                touchEnabled: false
            });
            tab.add(label);
            $.tabs.push(tab);
        }
        $.Tabs.setData($.tabs);
    };
    Ti.API.addEventListener("myEvents:fetched", function(data) {
        $.addData(data);
    });
    $.Tabs.addEventListener("click", function(_event) {
        if ("undefined" != typeof _event.source.nid) $.openCamera(_event.source.nid); else {
            $.openForm();
            APP.closeMenuRight();
        }
    });
    true && APP.Device.versionMajor >= 7 && ($.Tabs.top = "20dp");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;