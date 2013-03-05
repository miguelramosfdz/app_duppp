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
                    var newsItem = Alloy.createController("eventRow", event).getView();
                    data.push(newsItem);
                });
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
    function openTooltip() {
        $.tooltipContainer.show();
    }
    function openMenu() {
        $.menu.show();
    }
    function openCamera() {
        $.tooltipContainer.hide();
        Ti.Media.showCamera({
            showControls: !0,
            mediaTypes: Ti.Media.MEDIA_TYPE_VIDEO,
            videoQuality: Ti.Media.QUALITY_MEDIUM,
            autohide: !1,
            videoMaximumDuration: 10000,
            success: function(event) {
                Ti.Media.hideCamera();
            },
            error: function(error) {}
        });
    }
    function createEvent() {
        if (Titanium.App.Properties.getInt("userUid")) {
            var user = {
                uid: Titanium.App.Properties.getInt("userUid"),
                sessid: Titanium.App.Properties.getString("userSessionId"),
                session_name: Titanium.App.Properties.getString("userSessionName"),
                name: Titanium.App.Properties.getString("userName")
            }, node = {
                node: {
                    title: "Test",
                    type: "event",
                    group_access: {
                        und: "0"
                    },
                    field_event_date: {
                        und: [ {
                            show_todate: "1",
                            value: {
                                month: "2",
                                day: "14",
                                year: "2013",
                                hour: "20",
                                minute: "15"
                            },
                            value2: {
                                month: "2",
                                day: "15",
                                year: "2013",
                                hour: "20",
                                minute: "15"
                            }
                        } ]
                    },
                    uid: user.uid,
                    status: 1
                }
            }, url = REST_PATH + "/events/node";
            ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(node),
                dataType: "json",
                contentType: "application/json",
                success: function(data) {
                    alert("Content created with id " + data.nid);
                }
            });
        } else alert("You need to login first");
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
        title: "My Duppp"
    });
    $.__views.pullingContainer = Ti.UI.createView({
        backgroundColor: "#e2e7ed",
        width: 320,
        height: 60,
        id: "pullingContainer"
    });
    $.__views.child_window.add($.__views.pullingContainer);
    $.__views.__alloyId8 = Ti.UI.createView({
        backgroundColor: "#576c89",
        height: 2,
        bottom: 0,
        id: "__alloyId8"
    });
    $.__views.pullingContainer.add($.__views.__alloyId8);
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
    $.__views.menuBtn = Ti.UI.createButton({
        backgroundImage: "menuBtn@2x.png",
        top: 5,
        width: 43.5,
        height: 32.5,
        id: "menuBtn"
    });
    openMenu ? $.__views.menuBtn.addEventListener("click", openMenu) : __defers["$.__views.menuBtn!click!openMenu"] = !0;
    $.__views.child_window.leftNavButton = $.__views.menuBtn;
    $.__views.menu = Ti.UI.createView({
        backgroundColor: "#3B9DCB",
        width: 205,
        height: Titanium.UI.SIZE,
        top: 0,
        left: 3,
        id: "menu",
        visible: "false",
        layout: "vertical"
    });
    $.__views.child_window.add($.__views.menu);
    $.__views.menutest = Ti.UI.createButton({
        id: "menutest",
        title: "test du caca"
    });
    $.__views.menu.add($.__views.menutest);
    $.__views.__alloyId10 = Ti.UI.createButton({
        title: "ss du caca",
        id: "__alloyId10"
    });
    $.__views.menu.add($.__views.__alloyId10);
    $.__views.cameraBtn = Ti.UI.createButton({
        backgroundImage: "photoBtn@2x.png",
        top: 5,
        width: 43.5,
        height: 32.5,
        id: "cameraBtn"
    });
    openTooltip ? $.__views.cameraBtn.addEventListener("click", openTooltip) : __defers["$.__views.cameraBtn!click!openTooltip"] = !0;
    $.__views.child_window.rightNavButton = $.__views.cameraBtn;
    $.__views.tooltipContainer = Ti.UI.createView({
        backgroundColor: "#000",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        opacity: 0.8,
        zIndex: 1,
        id: "tooltipContainer",
        visible: "false"
    });
    $.__views.child_window.add($.__views.tooltipContainer);
    $.__views.tooltip = Ti.UI.createView({
        backgroundColor: "#0C2754",
        width: 265,
        height: Titanium.UI.SIZE,
        opacity: 1,
        zIndex: 2,
        id: "tooltip",
        layout: "vertical"
    });
    $.__views.tooltipContainer.add($.__views.tooltip);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        font: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        top: 15,
        text: "Let's go !",
        id: "__alloyId12"
    });
    $.__views.tooltip.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        font: {
            fontSize: 16,
            fontFamily: "Helvetica Neue"
        },
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: 30,
        left: 30,
        text: "You want to capture in which events ?",
        id: "__alloyId13"
    });
    $.__views.tooltip.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createButton({
        backgroundImage: "none",
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "50%",
                y: "0%"
            },
            endPoint: {
                x: "50%",
                y: "100%"
            },
            colors: [ {
                color: "#0C99FC",
                offset: 0
            }, {
                color: "#0E76FC",
                offset: 1
            } ]
        },
        width: Titanium.UI.FILL,
        font: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        right: 10,
        bottom: 10,
        top: 10,
        height: 40,
        borderRadius: 5,
        left: 10,
        shadowColor: "#999",
        shadowOffset: {
            x: 0,
            y: 1
        },
        title: "Event 1",
        id: "__alloyId14"
    });
    $.__views.tooltip.add($.__views.__alloyId14);
    openCamera ? $.__views.__alloyId14.addEventListener("click", openCamera) : __defers["$.__views.__alloyId14!click!openCamera"] = !0;
    $.__views.__alloyId15 = Ti.UI.createLabel({
        font: {
            fontSize: 16,
            fontFamily: "Helvetica Neue"
        },
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: 30,
        left: 30,
        text: "or",
        id: "__alloyId15"
    });
    $.__views.tooltip.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createButton({
        backgroundImage: "none",
        font: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        backgroundColor: "#79CF19",
        width: Titanium.UI.FILL,
        right: 10,
        bottom: 10,
        top: 10,
        height: 40,
        borderRadius: 5,
        left: 10,
        shadowColor: "#999",
        shadowOffset: {
            x: 0,
            y: 1
        },
        title: "Create Event",
        id: "__alloyId16"
    });
    $.__views.tooltip.add($.__views.__alloyId16);
    createEvent ? $.__views.__alloyId16.addEventListener("click", createEvent) : __defers["$.__views.__alloyId16!click!createEvent"] = !0;
    $.__views.overlay = Ti.UI.createView({
        id: "overlay",
        visible: "false",
        layout: "vertical"
    });
    $.__views.child_window.add($.__views.overlay);
    $.__views.capture = Ti.UI.createButton({
        backgroundImage: "none",
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "50%",
                y: "0%"
            },
            endPoint: {
                x: "50%",
                y: "100%"
            },
            colors: [ {
                color: "#0C99FC",
                offset: 0
            }, {
                color: "#0E76FC",
                offset: 1
            } ]
        },
        width: Titanium.UI.FILL,
        font: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        right: 10,
        bottom: 10,
        top: 10,
        height: 40,
        borderRadius: 5,
        left: 10,
        shadowColor: "#999",
        shadowOffset: {
            x: 0,
            y: 1
        },
        id: "capture",
        title: "Event 1"
    });
    $.__views.overlay.add($.__views.capture);
    $.__views.__alloyId17 = Ti.UI.createButton({
        backgroundImage: "none",
        font: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        backgroundColor: "#79CF19",
        width: Titanium.UI.FILL,
        right: 10,
        bottom: 10,
        top: 10,
        height: 40,
        borderRadius: 5,
        left: 10,
        shadowColor: "#999",
        shadowOffset: {
            x: 0,
            y: 1
        },
        title: "Create Event",
        id: "__alloyId17"
    });
    $.__views.overlay.add($.__views.__alloyId17);
    createEvent ? $.__views.__alloyId17.addEventListener("click", createEvent) : __defers["$.__views.__alloyId17!click!createEvent"] = !0;
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.child_window,
        id: "tab1",
        title: "Tab 1",
        icon: "KS_nav_views.png"
    });
    $.addTopLevelView($.__views.tab1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    Ti.include("tiajax.js");
    var data = [], current_row, url = REST_PATH + "/events/views/my_events.json?display_id=services_1", xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            json = JSON.parse(this.responseText);
            json.forEach(function(event) {
                var newsItem = Alloy.createController("eventRow", event).getView();
                data.push(newsItem);
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
    var pulling = !1, reloading = !1;
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
    var event1 = "dragEnd";
    Ti.version >= "3.0.0" && (event1 = "dragend");
    $.table.addEventListener(event1, function(e) {
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
    $.tooltipContainer.addEventListener("click", function(e) {
        $.tooltipContainer.hide();
    });
    var ajax = Titanium.Network.ajax;
    __defers["$.__views.menuBtn!click!openMenu"] && $.__views.menuBtn.addEventListener("click", openMenu);
    __defers["$.__views.cameraBtn!click!openTooltip"] && $.__views.cameraBtn.addEventListener("click", openTooltip);
    __defers["$.__views.__alloyId14!click!openCamera"] && $.__views.__alloyId14.addEventListener("click", openCamera);
    __defers["$.__views.__alloyId16!click!createEvent"] && $.__views.__alloyId16.addEventListener("click", createEvent);
    __defers["$.__views.__alloyId17!click!createEvent"] && $.__views.__alloyId17.addEventListener("click", createEvent);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;