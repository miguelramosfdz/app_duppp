function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.indexView = Ti.UI.createTabGroup({
        id: "indexView"
    });
    $.__views.__alloyId21 = Alloy.createController("activity", {
        id: "__alloyId21"
    });
    $.__views.indexView.addTab($.__views.__alloyId21.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId22 = Alloy.createController("myEvents", {
        id: "__alloyId22"
    });
    $.__views.indexView.addTab($.__views.__alloyId22.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId23 = Alloy.createController("explore", {
        id: "__alloyId23"
    });
    $.__views.indexView.addTab($.__views.__alloyId23.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId24 = Alloy.createController("configuration", {
        id: "__alloyId24"
    });
    $.__views.indexView.addTab($.__views.__alloyId24.getViewEx({
        recurse: true
    }));
    $.__views.indexView && $.addTopLevelView($.__views.indexView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var drupalServices = require("drupalServices"), userLoginWin = Alloy.createController("user").getView("userLogin"), eventsOpenWin = Alloy.createController("eventsOpen").getView();
    require("facebook");
    if (null == Ti.App.Properties.getInt("installComplete")) {
        drupalServices.getToken({
            success: function(token) {
                Ti.App.Properties.setString("token", token);
                drupalServices.systemInfo({
                    success: function(data) {
                        0 !== data.user.uid ? $.indexView.open() : userLoginWin.open();
                    },
                    error: function() {
                        alert("Error, contact the admin");
                    }
                });
            },
            error: function() {
                alert("Error, contact the admin");
            }
        });
        Ti.App.Properties.setInt("installComplete", 1);
    } else 0 !== Titanium.App.Properties.getInt("userUid") && $.indexView.open();
    Titanium.API.addEventListener("user:login", function() {
        drupalServices.getToken({
            success: function(token) {
                Ti.App.Properties.setString("token", token);
            },
            error: function() {
                alert("Error, contact the admin");
            }
        });
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