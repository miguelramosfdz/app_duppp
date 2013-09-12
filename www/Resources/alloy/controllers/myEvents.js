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
            type: "my_events",
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
    this.__controllerPath = "myEvents";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.child_window = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#000",
        backgroundColor: "#F3F3F3",
        font: {
            fontSize: 18,
            fontFamily: "Lato-Light"
        },
        tabBarHidden: true,
        id: "child_window",
        title: "My Events"
    });
    $.__views.table = Ti.UI.createTableView({
        id: "table",
        allowsSelection: "false"
    });
    $.__views.child_window.add($.__views.table);
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.child_window,
        id: "tab2",
        title: "Tab 2"
    });
    $.__views.tab2 && $.addTopLevelView($.__views.tab2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var dataEvents = [], nav = Alloy.createController("navActions"), uie = require("UiElements"), drupalServices = require("drupalServices"), indicator = uie.createIndicatorWindow();
    $.child_window.setLeftNavButton(nav.getView("menuBtn"));
    $.child_window.setRightNavButton(nav.getView("cameraBtn"));
    $.child_window.add(nav.getView("tooltipContainer"));
    $.child_window.add(nav.getView("menu"));
    $.child_window.addEventListener("open", function() {
        indicator.openIndicator();
        drupalServices.nodeList({
            type: "my_events",
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