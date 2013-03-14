function Controller() {
    function beginReloading() {
        setTimeout(endReloading, 2000);
    }
    function endReloading() {
        var xhr2 = Ti.Network.createHTTPClient({
            onload: function(e) {
                data = [];
                json = JSON.parse(this.responseText);
                json.forEach(function(event) {
                    if (event.closed === "1") {
                        var newsItem = Alloy.createController("eventRow", event).getView();
                        data.push(newsItem);
                    }
                });
                Titanium.API.fireEvent("refreshEvents");
                $.table.setData(data);
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert("error");
            },
            timeout: 5000
        });
        xhr2.open("GET", url);
        xhr2.send();
        $.table.setContentInsets({
            top: 0
        }, {
            animated: !0
        });
        reloading = !1;
        $.lastUpdatedLabel.text = "Last Updated:";
        $.statusLabel.text = "Pull down to refresh...";
        $.actInd.hide();
        $.arrow.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.child_window = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#3B9DCB",
        backgroundColor: "#F3F3F3",
        tabBarHidden: !0,
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
    $.__views.__alloyId9 = Ti.UI.createView({
        backgroundColor: "#576c89",
        height: 2,
        bottom: 0,
        id: "__alloyId9"
    });
    $.__views.pullingContainer.add($.__views.__alloyId9);
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
    $.addTopLevelView($.__views.tab2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    Ti.include("tiajax.js");
    var data = [], dataOpen = [], current_row, url = REST_PATH + "/events/my_events.json", pulling = !1, reloading = !1, ajax = Titanium.Network.ajax, nav = Alloy.createController("navActions");
    $.child_window.setLeftNavButton(nav.getView("menuBtn"));
    $.child_window.setRightNavButton(nav.getView("cameraBtn"));
    $.child_window.add(nav.getView("tooltipContainer"));
    $.child_window.add(nav.getView("menu"));
    var xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            json = JSON.parse(this.responseText);
            json.forEach(function(event) {
                if (event.closed === "1") {
                    var newsItem = Alloy.createController("eventRow", event).getView();
                    data.push(newsItem);
                }
            });
            $.table.setData(data);
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
            alert("error");
        },
        timeout: 5000
    });
    $.child_window.addEventListener("open", function() {
        xhr.open("GET", url);
        xhr.send();
    });
    $.table.headerPullView = $.pullingContainer;
    $.table.addEventListener("scroll", function(e) {
        var offset = e.contentOffset.y;
        if (offset <= -65 && !pulling && !reloading) {
            var t = Ti.UI.create2DMatrix();
            t = t.rotate(-180);
            pulling = !0;
            $.statusLabel.text = "Release to refresh...";
        } else if (pulling && offset > -65 && offset < 0 && !reloading) {
            pulling = !1;
            var t = Ti.UI.create2DMatrix();
            $.statusLabel.text = "Pull down to refresh...";
        }
    });
    $.table.addEventListener("dragend", function(e) {
        if (pulling && !reloading) {
            reloading = !0;
            pulling = !1;
            $.arrow.hide();
            $.actInd.show();
            $.statusLabel.text = "Reloading...";
            $.table.setContentInsets({
                top: 60
            }, {
                animated: !0
            });
            beginReloading();
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;