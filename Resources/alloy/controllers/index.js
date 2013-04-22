function Controller() {
    function checkConnection() {
        ajax({
            type: "POST",
            url: urlInfo,
            dataType: "json",
            contentType: "application/json",
            success: function(data) {
                if (0 !== data.user.uid) $.indexView.open(); else {
                    userLoginWin.open();
                    Ti.Facebook.logout();
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
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
    Ti.include("tiajax.js");
    var userLoginWin = Alloy.createController("user").getView("userLogin"), eventsOpenWin = Alloy.createController("eventsOpen").getView(), ajax = Titanium.Network.ajax, urlInfo = REST_PATH + "/system/connect";
    checkConnection();
    Titanium.App.addEventListener("resume", function() {
        checkConnection();
    });
    Titanium.API.addEventListener("user:login", function() {
        $.indexView.open({
            transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        });
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