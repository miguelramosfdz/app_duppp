function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.chariti.slideMenu/" + s : s.substring(0, index) + "/com.chariti.slideMenu/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("com.chariti.slideMenu");
    this.__widgetId = "com.chariti.slideMenu";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        width: "80%",
        top: "0dp",
        left: "-80%",
        backgroundColor: "#2c3e50",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.Tabs = Ti.UI.createTableView({
        top: "0dp",
        backgroundColor: "#2c3e50",
        separatorColor: "#34495e",
        separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE,
        id: "Tabs"
    });
    $.__views.Wrapper.add($.__views.Tabs);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    $.init = function(_params) {
        $.tabs = [];
        _params.tabs.push({
            id: "settings",
            image: WPATH("images/settings.png"),
            title: "Settings"
        });
        for (var i = 0; _params.tabs.length > i; i++) {
            var tab = Ti.UI.createTableViewRow({
                id: _params.tabs[i].id,
                height: "47dp",
                backgroundcolor: "#111",
                backgroundSelectedColor: "#27ae60",
                selectedBackgroundColor: "#27ae60"
            });
            var icon = Ti.UI.createImageView({
                image: _params.tabs[i].image,
                width: "21dp",
                height: "21dp",
                top: "13dp",
                left: "13dp",
                touchEnabled: false,
                preventDefaultImage: true
            });
            var label = Ti.UI.createLabel({
                text: _params.tabs[i].title,
                top: "0dp",
                left: "47dp",
                right: "13dp",
                height: "47dp",
                font: {
                    fontSize: "16dp",
                    fontFamily: "Lato-Regular"
                },
                color: "#FFF",
                touchEnabled: false
            });
            tab.add(icon);
            tab.add(label);
            $.tabs.push(tab);
        }
        $.Tabs.setData($.tabs);
    };
    $.clear = function() {
        $.Tabs.setData([]);
    };
    $.setIndex = function(_index) {
        $.Tabs.selectRow(_index);
    };
    $.Tabs.addEventListener("click", function(_event) {
        "undefined" != typeof _event.index && $.setIndex(_event.index);
    });
    true && APP.Device.versionMajor >= 7 && ($.Tabs.top = "20dp");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;