function Controller() {
    function myLoaderCallback(widgetCallback) {
        var xhr2 = Ti.Network.createHTTPClient({
            onload: function(e) {
                data = [];
                json = JSON.parse(this.responseText);
                json.forEach(function(event) {
                    if (event.field_event_closed === "1") {
                        var newsItem = Alloy.createController("eventRow", event).getView();
                        data.push(newsItem);
                    }
                });
                Titanium.API.fireEvent("refreshEvents");
                $.table.setData(data);
                widgetCallback(!0);
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert("error");
            },
            timeout: 5000
        });
        xhr2.open("GET", url);
        xhr2.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.child_window = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#3B9DCB",
        backgroundColor: "#F3F3F3",
        tabBarHidden: !0,
        id: "child_window",
        title: "Activity"
    });
    $.__views.table = Ti.UI.createTableView({
        id: "table",
        allowsSelection: "false"
    });
    $.__views.child_window.add($.__views.table);
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.child_window,
        id: "tab1",
        title: "Tab 1",
        icon: "KS_nav_views.png"
    });
    $.addTopLevelView($.__views.tab1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    var data = [], url = REST_PATH + "/event.json?type=activity", nav = Alloy.createController("navActions"), uie = require("UiElements"), indicator = uie.createIndicatorWindow();
    $.child_window.setLeftNavButton(nav.getView("menuBtn"));
    $.child_window.setRightNavButton(nav.getView("cameraBtn"));
    $.child_window.add(nav.getView("tooltipContainer"));
    $.child_window.add(nav.getView("menu"));
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            json = JSON.parse(this.responseText);
            json.forEach(function(event) {
                if (event.field_event_closed === "1") {
                    var newsItem = Alloy.createController("eventRow", event).getView();
                    data.push(newsItem);
                }
            });
            $.table.setData(data);
            indicator.closeIndicator();
        },
        onerror: function(e) {
            alert("The server cannot be reached");
            indicator.closeIndicator();
        },
        timeout: 5000
    });
    $.child_window.addEventListener("open", function() {
        indicator.openIndicator();
        xhr.open("GET", url);
        xhr.send();
    });
    var ptrCtrl = Alloy.createWidget("nl.fokkezb.pullToRefresh", null, {
        table: $.table,
        loader: myLoaderCallback
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;