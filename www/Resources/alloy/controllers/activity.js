function Controller() {
    function myLoaderCallback(widgetCallback) {
        drupalServices.nodeList({
            type: "activity",
            success: function(data) {
                $.handleData(data);
                widgetCallback(true);
            },
            error: function() {
                widgetCallback(true);
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "activity";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        backgroundColor: "#F3F3F3",
        layout: "vertical",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.NavigationBar = Alloy.createWidget("com.chariti.navigationBar", "widget", {
        id: "NavigationBar",
        image: "duppp.png",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.tableWrapper = Ti.UI.createView({
        id: "tableWrapper"
    });
    $.__views.Wrapper.add($.__views.tableWrapper);
    $.__views.container = Ti.UI.createTableView({
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        id: "container",
        allowsSelection: "false"
    });
    $.__views.tableWrapper.add($.__views.container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var CONFIG = arguments[0];
    var drupalServices = require("drupalServices");
    $.init = function() {
        APP.log("debug", "activity.init | " + JSON.stringify(CONFIG));
        APP.openLoading();
        $.retrieveData();
        $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");
        true === CONFIG.isChild && $.NavigationBar.showBack();
        if (APP.Settings.useSlideMenu) {
            $.NavigationBar.showMenu();
            $.NavigationBar.showCamera();
        } else $.NavigationBar.showSettings();
    };
    $.retrieveData = function() {
        drupalServices.nodeList({
            type: "activity",
            success: function(data) {
                $.handleData(data);
                APP.closeLoading();
            },
            error: function() {
                APP.closeLoading();
            }
        });
    };
    $.handleData = function(_data) {
        APP.log("debug", "event.handleData");
        var rows = [];
        _data.forEach(function(event) {
            if ("1" === event.field_event_closed) {
                var newsItem = Alloy.createController("eventRow", event).getView();
                rows.push(newsItem);
            }
        });
        $.container.setData(rows);
    };
    Alloy.createWidget("nl.fokkezb.pullToRefresh", null, {
        table: $.container,
        loader: myLoaderCallback
    });
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;