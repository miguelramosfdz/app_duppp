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
        title: "My Events"
    });
    $.__views.pullingContainer = Ti.UI.createView({
        backgroundColor: "#e2e7ed",
        width: 320,
        height: 60,
        id: "pullingContainer"
    });
    $.__views.child_window.add($.__views.pullingContainer);
    $.__views.__alloyId14 = Ti.UI.createView({
        backgroundColor: "#576c89",
        height: 2,
        bottom: 0,
        id: "__alloyId14"
    });
    $.__views.pullingContainer.add($.__views.__alloyId14);
    $.__views.arrow = Ti.UI.createView({
        backgroundImage: "whiteArrow.png",
        width: 23,
        height: 60,
        bottom: 10,
        left: 20,
        id: "arrow"
    });
    $.__views.pullingContainer.add($.__views.arrow);
    $.__views.statusLabel = Ti.UI.createLabel({
        left: 55,
        width: 200,
        bottom: 30,
        height: "auto",
        color: "#576c89",
        textAlign: "center",
        font: {
            fontSize: 13,
            fontWeight: "bold"
        },
        shadowColor: "#999",
        shadowOffset: {
            x: 0,
            y: 1
        },
        id: "statusLabel",
        text: "Pull to reload"
    });
    $.__views.pullingContainer.add($.__views.statusLabel);
    $.__views.lastUpdatedLabel = Ti.UI.createLabel({
        left: 55,
        width: 200,
        bottom: 15,
        height: "auto",
        color: "#576c89",
        textAlign: "center",
        font: {
            fontSize: 12
        },
        shadowColor: "#999",
        shadowOffset: {
            x: 0,
            y: 1
        },
        id: "lastUpdatedLabel",
        text: "Last update :"
    });
    $.__views.pullingContainer.add($.__views.lastUpdatedLabel);
    $.__views.actInd = Ti.UI.createActivityIndicator({
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
        left: 20,
        bottom: 13,
        width: 30,
        height: 30,
        id: "actInd",
        message: "Loading..."
    });
    $.__views.pullingContainer.add($.__views.actInd);
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