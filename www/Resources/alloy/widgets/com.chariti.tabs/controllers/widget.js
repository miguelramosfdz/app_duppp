function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.chariti.tabs/" + s : s.substring(0, index) + "/com.chariti.tabs/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("com.chariti.tabs");
    this.__widgetId = "com.chariti.tabs";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        height: "60dp",
        bottom: "0dp",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.TabGroup = Ti.UI.createView({
        height: "60dp",
        width: Ti.UI.FILL,
        bottom: "0dp",
        id: "TabGroup"
    });
    $.__views.Wrapper.add($.__views.TabGroup);
    $.__views.Border = Ti.UI.createView({
        top: "0dp",
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundColor: "#000",
        opacity: .2,
        id: "Border"
    });
    $.__views.TabGroup.add($.__views.Border);
    $.__views.IndicatorContainer = Ti.UI.createView({
        height: "59dp",
        id: "IndicatorContainer"
    });
    $.__views.TabGroup.add($.__views.IndicatorContainer);
    $.__views.Indicator = Ti.UI.createView({
        height: "59dp",
        bottom: "0dp",
        left: "0dp",
        backgroundColor: "#FFF",
        opacity: .4,
        id: "Indicator"
    });
    $.__views.IndicatorContainer.add($.__views.Indicator);
    $.__views.Overlay = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "60dp",
        id: "Overlay"
    });
    $.__views.TabGroup.add($.__views.Overlay);
    $.__views.TabContainer = Ti.UI.createView({
        height: "60dp",
        id: "TabContainer"
    });
    $.__views.TabGroup.add($.__views.TabContainer);
    $.__views.Tabs = Ti.UI.createView({
        layout: "horizontal",
        height: "60dp",
        width: Ti.UI.FILL,
        id: "Tabs"
    });
    $.__views.TabContainer.add($.__views.Tabs);
    $.__views.TabGroupMore = Ti.UI.createView({
        height: Ti.UI.SIZE,
        bottom: "60dp",
        id: "TabGroupMore"
    });
    $.__views.Wrapper.add($.__views.TabGroupMore);
    $.__views.TabContainerMore = Ti.UI.createView({
        height: Ti.UI.SIZE,
        right: "0dp",
        id: "TabContainerMore"
    });
    $.__views.TabGroupMore.add($.__views.TabContainerMore);
    $.__views.IndicatorMore = Ti.UI.createView({
        height: "60dp",
        top: "0dp",
        left: "0dp",
        width: Ti.UI.FILL,
        backgroundColor: "#FFF",
        opacity: .4,
        id: "IndicatorMore"
    });
    $.__views.TabContainerMore.add($.__views.IndicatorMore);
    $.__views.TabsMore = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        bottom: "0dp",
        id: "TabsMore"
    });
    $.__views.TabContainerMore.add($.__views.TabsMore);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.init = function(_params) {
        $.tabs = [];
        $.excess = false;
        $.excessLength = 5;
        $.moreOpen = false;
        $.width = 0;
        $.display = {
            width: Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth,
            height: Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight,
            dpi: Ti.Platform.displayCaps.dpi
        };
        Alloy.isTablet && ($.excessLength = Math.floor($.display.width / 70));
        _params.tabs.length > $.excessLength && ($.excess = true);
        $.width = $.excess ? Math.floor($.display.width / $.excessLength) : Math.floor($.display.width / _params.tabs.length);
        $.TabGroup.backgroundColor = _params.colors.primary;
        $.TabContainerMore.backgroundColor = _params.colors.primary;
        $.Indicator.backgroundColor = _params.colors.secondary;
        $.IndicatorMore.backgroundColor = _params.colors.secondary;
        $.IndicatorContainer.width = $.display.width + "dp";
        $.Indicator.width = $.width + "dp";
        $.IndicatorMore.width = $.width + "dp";
        $.TabContainer.width = $.display.width + "dp";
        $.TabGroupMore.width = $.display.width + "dp";
        $.TabContainerMore.width = $.width + "dp";
        for (var i = 0; _params.tabs.length > i; i++) {
            $.excess && i == $.excessLength - 1 && $.addMoreTab(_params);
            var tab = Ti.UI.createView({
                id: _params.tabs[i].id,
                width: $.width + "dp",
                height: "60dp",
                bottom: "0dp",
                left: "0dp"
            });
            var icon = Ti.UI.createImageView({
                image: _params.tabs[i].image,
                width: "32dp",
                height: "32dp",
                top: "7dp",
                touchEnabled: false,
                preventDefaultImage: true
            });
            var label = Ti.UI.createLabel({
                text: _params.tabs[i].title,
                top: "42dp",
                left: "5dp",
                right: "5dp",
                width: Ti.UI.FILL,
                height: "15dp",
                font: {
                    fontSize: "10dp",
                    fontFamily: "HelveticaNeue"
                },
                color: _params.colors.text,
                textAlign: "center",
                touchEnabled: false
            });
            tab.add(icon);
            tab.add(label);
            if ($.excess && i >= $.excessLength - 1) {
                tab.width = $.width + "dp";
                label.left = "5dp";
                $.tabs.push(tab);
                $.TabsMore.add(tab);
            } else $.tabs.push(tab);
        }
        for (var i = 0, z = $.excessLength; z > i; i++) $.tabs[i] && $.Tabs.add($.tabs[i]);
    };
    $.addMoreTab = function(_params) {
        var tab = Ti.UI.createView({
            width: $.width + "dp"
        });
        var icon = Ti.UI.createImageView({
            image: "/icons/more.png",
            width: "32dp",
            height: "32dp",
            top: "7dp",
            touchEnabled: false,
            preventDefaultImage: true
        });
        var label = Ti.UI.createLabel({
            text: "More",
            top: "43dp",
            left: "5dp",
            right: "5dp",
            width: Ti.UI.FILL,
            height: "13dp",
            font: {
                fontSize: "10dp",
                fontFamily: "HelveticaNeue"
            },
            color: _params.colors.text,
            textAlign: "center",
            touchEnabled: false
        });
        tab.add(icon);
        tab.add(label);
        tab.addEventListener("click", $.moreEvent);
        $.tabs.push(tab);
    };
    $.clear = function() {
        var children = $.Tabs.children;
        var childrenMore = $.TabsMore.children;
        for (var i = 0; children.length > i; i++) $.Tabs.remove(children[i]);
        for (var i = 0; childrenMore.length > i; i++) $.TabsMore.remove(childrenMore[i]);
    };
    $.setIndex = function(_index) {
        if ($.excess && _index > $.excessLength - 2) {
            _moreIndex = _index - ($.excessLength - 1);
            _index = $.excessLength - 1;
            $.IndicatorMore.visible = true;
            $.IndicatorMore.top = 60 * _moreIndex + "dp";
        } else $.IndicatorMore.visible = false;
        $.Indicator.left = _index * $.width + "dp";
        $.Indicator.width = $.width + "dp";
        $.moreClose();
    };
    $.moreEvent = function() {
        if ($.moreOpen) {
            $.Wrapper.height = "60dp";
            $.moreOpen = false;
        } else {
            $.moreOpen = true;
            $.Wrapper.height = Ti.UI.SIZE;
        }
    };
    $.moreClose = function() {
        $.Wrapper.height = "60dp";
        $.moreOpen = false;
    };
    $.Wrapper.addEventListener("click", function(_event) {
        "undefined" != typeof _event.source.id && "number" == typeof _event.source.id && $.setIndex(_event.source.id);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;