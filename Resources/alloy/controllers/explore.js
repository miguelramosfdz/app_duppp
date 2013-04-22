function Controller() {
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
        title: "Explore"
    });
    $.__views.__alloyId9 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId9"
    });
    $.__views.child_window.add($.__views.__alloyId9);
    $.__views.search = Ti.UI.createSearchBar({
        id: "search",
        hintText: "Search a user"
    });
    $.__views.__alloyId9.add($.__views.search);
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.__alloyId9.add($.__views.table);
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.child_window,
        id: "tab2",
        title: "Tab 2",
        icon: "KS_nav_views.png"
    });
    $.__views.tab2 && $.addTopLevelView($.__views.tab2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    var data = [], nav = Alloy.createController("navActions"), uie = require("UiElements"), indicator = uie.createIndicatorWindow();
    $.child_window.setLeftNavButton(nav.getView("menuBtn"));
    $.child_window.setRightNavButton(nav.getView("cameraBtn"));
    $.child_window.add(nav.getView("tooltipContainer"));
    $.child_window.add(nav.getView("menu"));
    var xhrUsers = Ti.Network.createHTTPClient({
        onload: function() {
            data = [];
            json = JSON.parse(this.responseText);
            json.forEach(function(user) {
                if (parseInt(user.uid) !== Titanium.App.Properties.getInt("userUid")) {
                    var newsItem = Alloy.createController("userRow", user).getView();
                    data.push(newsItem);
                }
            });
            $.table.setData(data);
            indicator.closeIndicator();
        },
        onerror: function() {},
        timeout: 5e3
    });
    var last_search = null;
    $.search.addEventListener("return", function(e) {
        if (e.value != last_search) {
            last_search = e.value;
            indicator.openIndicator();
            var urlUsers = REST_PATH + "/duppp_user.json?username=" + e.value;
            xhrUsers.open("GET", urlUsers);
            xhrUsers.send();
            $.search.blur();
        }
    });
    $.table.addEventListener("click", function(e) {
        var win = Alloy.createController("profilePage", e.row.uid).getView();
        Titanium.API.fireEvent("openAsNavigation", {
            window: win
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;