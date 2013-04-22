function Controller() {
    function checkConnection() {
        var xhr3 = Titanium.Network.createHTTPClient();
        xhr3.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr3.open("POST", urlInfo);
        xhr3.send();
        xhr3.onload = function() {
            var statusCode = xhr3.status;
            if (200 == statusCode) {
                var response = xhr3.responseText;
                var data = JSON.parse(response);
                if (0 !== data.user.uid) $.indexView.open(); else {
                    userLoginWin.open();
                    Ti.Facebook.logout();
                }
            } else alert("There was an error");
        };
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.indexView = Ti.UI.createTabGroup({
        id: "indexView"
    });
    $.__views.__alloyId10 = Alloy.createController("activity", {
        id: "__alloyId10"
    });
    $.__views.indexView.addTab($.__views.__alloyId10.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId11 = Alloy.createController("myEvents", {
        id: "__alloyId11"
    });
    $.__views.indexView.addTab($.__views.__alloyId11.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId12 = Alloy.createController("explore", {
        id: "__alloyId12"
    });
    $.__views.indexView.addTab($.__views.__alloyId12.getViewEx({
        recurse: true
    }));
    $.__views.indexView && $.addTopLevelView($.__views.indexView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    var userLoginWin = Alloy.createController("user").getView("userLogin"), eventsOpenWin = Alloy.createController("eventsOpen").getView(), urlInfo = REST_PATH + "/system/connect";
    checkConnection();
    Titanium.App.addEventListener("resume", function() {
        checkConnection();
    });
    Titanium.API.addEventListener("user:login", function() {
        $.indexView.open({
            transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        });
        Titanium.API.fireEvent("index:open");
    });
    Titanium.API.addEventListener("clickMenuChild", function(data) {
        $.indexView.tabs[data.tab_id].active = true;
    });
    Titanium.API.addEventListener("openAsNavigation", function(data) {
        $.indexView.activeTab.open(data.window);
    });
    $.indexView.add(eventsOpenWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;