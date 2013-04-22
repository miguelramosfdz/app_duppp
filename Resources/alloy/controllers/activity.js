function Controller() {
    function prepareData(data) {
        dataEvents = [];
        data.forEach(function(event) {
            if ("1" === event.field_event_closed) {
                var newsItem = Alloy.createController("eventRow", event).getView();
                dataEvents.push(newsItem);
            }
        });
        $.table.setData(dataEvents);
    }
    function myLoaderCallback(widgetCallback) {
        drupalServices.nodeList({
            type: "activity",
            success: function(data) {
                prepareData(data);
                widgetCallback(true);
            },
            error: function() {
                widgetCallback(true);
                alert("error");
            }
        });
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
    var dataEvents = [], nav = Alloy.createController("navActions"), uie = require("UiElements"), drupalServices = require("drupalServices"), indicator = uie.createIndicatorWindow();
    $.child_window.setLeftNavButton(nav.getView("menuBtn"));
    $.child_window.setRightNavButton(nav.getView("cameraBtn"));
    $.child_window.add(nav.getView("tooltipContainer"));
    $.child_window.add(nav.getView("menu"));
    $.child_window.addEventListener("open", function() {
        indicator.openIndicator();
        drupalServices.nodeList({
            type: "activity",
            success: function(data) {
                prepareData(data);
                indicator.closeIndicator();
            },
            error: function() {
                indicator.closeIndicator();
                alert("error");
            }
        });
    });
    Alloy.createWidget("nl.fokkezb.pullToRefresh", null, {
        table: $.table,
        loader: myLoaderCallback
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;