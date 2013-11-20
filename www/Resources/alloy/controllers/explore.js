function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "explore";
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
        text: "Explore",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.__alloyId8 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId8"
    });
    $.__views.Wrapper.add($.__views.__alloyId8);
    $.__views.search = Ti.UI.createSearchBar({
        id: "search",
        hintText: "Search a @user or #hashtag"
    });
    $.__views.__alloyId8.add($.__views.search);
    $.__views.table = Ti.UI.createTableView({
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        id: "table",
        allowsSelection: "false"
    });
    $.__views.__alloyId8.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var CONFIG = arguments[0];
    var data = [];
    var last_search = null;
    var drupalServices = require("drupalServices");
    $.init = function() {
        APP.log("debug", "explore.init | " + JSON.stringify(CONFIG));
        $.retrieveData("public", "");
        $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");
        true === CONFIG.isChild && $.NavigationBar.showBack();
        if (APP.Settings.useSlideMenu) {
            $.NavigationBar.showMenu();
            $.NavigationBar.showCamera();
        } else $.NavigationBar.showSettings();
    };
    $.retrieveData = function(type, search) {
        APP.openLoading();
        drupalServices.nodeList(type, search, function(data) {
            $.handleData(data);
            APP.closeLoading();
        }, function() {
            APP.closeLoading();
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
        $.table.setData(rows);
    };
    $.search.addEventListener("return", function(e) {
        if (e.value != last_search) {
            last_search = e.value;
            if (0 === e.value.indexOf("@")) {
                APP.openLoading();
                drupalServices.searchUser(e.value.substring(1), function(users) {
                    data = [];
                    users.forEach(function(user) {
                        var newsItem = Alloy.createController("userRow", user).getView();
                        data.push(newsItem);
                    });
                    $.table.setData(data);
                    $.table.setAllowsSelection(true);
                    APP.closeLoading();
                });
            } else $.retrieveData("public_event", e.value);
            $.search.blur();
        }
    });
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;