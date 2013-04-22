function Controller() {
    function myLoaderCallback(widgetCallback) {
        var xhr2 = Ti.Network.createHTTPClient({
            onload: function() {
                data = [];
                json = JSON.parse(this.responseText);
                json.forEach(function(event) {
                    if ("1" === event.field_event_closed) {
                        var newsItem = Alloy.createController("eventRow", event).getView();
                        data.push(newsItem);
                    }
                });
                Titanium.API.fireEvent("refreshEvents");
                $.table.setData(data);
                widgetCallback(true);
            },
            onerror: function() {
                widgetCallback(true);
                alert("error");
            },
            timeout: 5e3
        });
        xhr2.open("GET", url);
        xhr2.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.child_window = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#3B9DCB",
        backgroundColor: "#F3F3F3",
        tabBarHidden: true,
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
    $.__views.tab1 && $.addTopLevelView($.__views.tab1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    var data = [], url = REST_PATH + "/event.json?type=activity", nav = Alloy.createController("navActions"), uie = require("UiElements"), indicator = uie.createIndicatorWindow();
    $.child_window.setLeftNavButton(nav.getView("menuBtn"));
    $.child_window.setRightNavButton(nav.getView("cameraBtn"));
    $.child_window.add(nav.getView("tooltipContainer"));
    $.child_window.add(nav.getView("menu"));
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            json = JSON.parse(this.responseText);
            json.forEach(function(event) {
                if ("1" === event.field_event_closed) {
                    var newsItem = Alloy.createController("eventRow", event).getView();
                    data.push(newsItem);
                }
            });
            $.table.setData(data);
            indicator.closeIndicator();
        },
        onerror: function() {
            alert("The server cannot be reached");
            indicator.closeIndicator();
        },
        timeout: 5e3
    });
    $.child_window.addEventListener("open", function() {
        indicator.openIndicator();
        xhr.open("GET", url);
        xhr.send();
    });
    Alloy.createWidget("nl.fokkezb.pullToRefresh", null, {
        table: $.table,
        loader: myLoaderCallback
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;