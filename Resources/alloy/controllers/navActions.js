function Controller() {
    function removeAllChildren(viewObject) {
        var children = viewObject.children.slice(0);
        for (var i = 0; i < children.length; ++i) viewObject.remove(children[i]);
    }
    function openEventForm() {
        var eventForm = Alloy.createController("eventForm").getView();
        Titanium.API.fireEvent("openAsNavigation", {
            window: eventForm
        });
    }
    function openCamera(nid) {
        var user = {
            uid: Titanium.App.Properties.getInt("userUid"),
            sessid: Titanium.App.Properties.getString("userSessionId"),
            session_name: Titanium.App.Properties.getString("userSessionName"),
            name: Titanium.App.Properties.getString("userName")
        };
        Titanium.Media.showCamera({
            success: function(event) {
                dupppUpload.addFile(event.media, nid, (new Date).getTime(), user.uid);
            },
            cancel: function() {},
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Video"
                });
                error.code == Titanium.Media.NO_VIDEO ? a.setMessage("Device does not have video recording capabilities") : a.setMessage("Unexpected error: " + error.code);
                a.show();
            },
            mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
            videoMaximumDuration: 10000,
            videoQuality: Titanium.Media.QUALITY_MEDIUM
        });
    }
    function menuChild(e) {
        $.menu.hide();
        Titanium.API.fireEvent("clickMenuChild", {
            tab_id: e.source.index
        });
    }
    function openTooltip() {
        xhr.open("GET", url);
        xhr.send();
        $.tooltipContainer.show();
    }
    function openClose() {
        xhr2.open("GET", url);
        xhr2.send();
        $.closeEventsWrapper.show();
    }
    function openMenu() {
        $.menu.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.navActions = Ti.UI.createView({
        id: "navActions"
    });
    $.addTopLevelView($.__views.navActions);
    $.__views.menuBtn = Ti.UI.createButton({
        backgroundImage: "menuBtn@2x.png",
        top: 5,
        left: 5,
        width: 43.5,
        height: 32.5,
        id: "menuBtn"
    });
    $.__views.navActions.add($.__views.menuBtn);
    openMenu ? $.__views.menuBtn.addEventListener("click", openMenu) : __defers["$.__views.menuBtn!click!openMenu"] = !0;
    $.__views.cameraBtn = Ti.UI.createButton({
        backgroundImage: "photoBtn@2x.png",
        top: 5,
        right: 5,
        width: 43.5,
        height: 32.5,
        id: "cameraBtn"
    });
    $.__views.navActions.add($.__views.cameraBtn);
    openTooltip ? $.__views.cameraBtn.addEventListener("click", openTooltip) : __defers["$.__views.cameraBtn!click!openTooltip"] = !0;
    $.__views.menu = Ti.UI.createView({
        backgroundColor: "#3B9DCB",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        top: 0,
        id: "menu",
        visible: "false",
        layout: "vertical"
    });
    $.__views.navActions.add($.__views.menu);
    $.__views.__alloyId27 = Ti.UI.createButton({
        backgroundImage: "none",
        height: 40,
        width: Titanium.UI.FILL,
        font: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        index: "0",
        title: "Home",
        id: "__alloyId27"
    });
    $.__views.menu.add($.__views.__alloyId27);
    menuChild ? $.__views.__alloyId27.addEventListener("click", menuChild) : __defers["$.__views.__alloyId27!click!menuChild"] = !0;
    $.__views.__alloyId28 = Ti.UI.createButton({
        backgroundImage: "none",
        height: 40,
        width: Titanium.UI.FILL,
        font: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        index: "1",
        title: "My Events",
        id: "__alloyId28"
    });
    $.__views.menu.add($.__views.__alloyId28);
    menuChild ? $.__views.__alloyId28.addEventListener("click", menuChild) : __defers["$.__views.__alloyId28!click!menuChild"] = !0;
    $.__views.__alloyId29 = Ti.UI.createButton({
        backgroundImage: "none",
        height: 40,
        width: Titanium.UI.FILL,
        font: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        index: "2",
        title: "Explore",
        id: "__alloyId29"
    });
    $.__views.menu.add($.__views.__alloyId29);
    menuChild ? $.__views.__alloyId29.addEventListener("click", menuChild) : __defers["$.__views.__alloyId29!click!menuChild"] = !0;
    $.__views.__alloyId30 = Ti.UI.createButton({
        backgroundImage: "none",
        height: 40,
        width: Titanium.UI.FILL,
        font: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        index: "3",
        title: "Log out",
        id: "__alloyId30"
    });
    $.__views.menu.add($.__views.__alloyId30);
    menuChild ? $.__views.__alloyId30.addEventListener("click", menuChild) : __defers["$.__views.__alloyId30!click!menuChild"] = !0;
    $.__views.tooltipContainer = Ti.UI.createView({
        backgroundColor: "#000",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        opacity: 0.8,
        zIndex: 5,
        id: "tooltipContainer",
        visible: "false"
    });
    $.__views.navActions.add($.__views.tooltipContainer);
    $.__views.tooltip = Ti.UI.createView({
        backgroundColor: "#0C2754",
        width: 265,
        height: Titanium.UI.SIZE,
        opacity: 1,
        zIndex: 6,
        id: "tooltip",
        layout: "vertical"
    });
    $.__views.tooltipContainer.add($.__views.tooltip);
    $.__views.__alloyId31 = Ti.UI.createLabel({
        font: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        top: 15,
        text: "Let's go !",
        id: "__alloyId31"
    });
    $.__views.tooltip.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createLabel({
        font: {
            fontSize: 16,
            fontFamily: "Helvetica Neue"
        },
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: 30,
        left: 30,
        text: "You want to capture in which events ?",
        id: "__alloyId32"
    });
    $.__views.tooltip.add($.__views.__alloyId32);
    $.__views.tableOpen = Ti.UI.createScrollView({
        height: 100,
        width: "100%",
        contentWidth: "100%",
        id: "tableOpen",
        layout: "vertical"
    });
    $.__views.tooltip.add($.__views.tableOpen);
    $.__views.__alloyId33 = Ti.UI.createLabel({
        font: {
            fontSize: 16,
            fontFamily: "Helvetica Neue"
        },
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: 30,
        left: 30,
        text: "or",
        id: "__alloyId33"
    });
    $.__views.tooltip.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createButton({
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
        id: "__alloyId34"
    });
    $.__views.tooltip.add($.__views.__alloyId34);
    openEventForm ? $.__views.__alloyId34.addEventListener("click", openEventForm) : __defers["$.__views.__alloyId34!click!openEventForm"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    Ti.include("tiajax.js");
    var data = [], url = REST_PATH + "/event.json?type=my_events", ajax = Titanium.Network.ajax, dupppUpload = require("duppp_upload"), xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            removeAllChildren($.tableOpen);
            json = JSON.parse(this.responseText);
            json.forEach(function(event) {
                if (event.field_event_closed === "1") return;
                var openItem = Titanium.UI.createButton({
                    title: event.title,
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
                    top: 10,
                    bottom: 5,
                    height: 40,
                    borderRadius: 5,
                    left: 10,
                    shadowColor: "#999",
                    shadowOffset: {
                        x: 0,
                        y: 1
                    },
                    nid: event.nid
                });
                openItem.addEventListener("click", function(e) {
                    openCamera(e.source.nid);
                });
                $.tableOpen.add(openItem);
            });
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
            alert("error");
        },
        timeout: 5000
    });
    $.tooltipContainer.addEventListener("click", function(e) {
        $.tooltipContainer.hide();
    });
    var xhr2 = Ti.Network.createHTTPClient({
        onload: function(e) {
            removeAllChildren($.closeEvents);
            json = JSON.parse(this.responseText);
            json.forEach(function(event) {
                if (event.closed === "1") return;
                var openItem = Titanium.UI.createButton({
                    title: event.node_title,
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
                    top: 10,
                    bottom: 5,
                    height: 40,
                    borderRadius: 5,
                    left: 10,
                    shadowColor: "#999",
                    shadowOffset: {
                        x: 0,
                        y: 1
                    },
                    nid: event.nid
                });
                openItem.addEventListener("click", function(e) {
                    closeEvent(e.source.nid);
                    $.closeEventsWrapper.hide();
                });
                $.closeEvents.add(openItem);
            });
        },
        onerror: function(e) {
            Ti.API.debug(e.error);
            alert("error");
        },
        timeout: 5000
    });
    __defers["$.__views.menuBtn!click!openMenu"] && $.__views.menuBtn.addEventListener("click", openMenu);
    __defers["$.__views.cameraBtn!click!openTooltip"] && $.__views.cameraBtn.addEventListener("click", openTooltip);
    __defers["$.__views.__alloyId27!click!menuChild"] && $.__views.__alloyId27.addEventListener("click", menuChild);
    __defers["$.__views.__alloyId28!click!menuChild"] && $.__views.__alloyId28.addEventListener("click", menuChild);
    __defers["$.__views.__alloyId29!click!menuChild"] && $.__views.__alloyId29.addEventListener("click", menuChild);
    __defers["$.__views.__alloyId30!click!menuChild"] && $.__views.__alloyId30.addEventListener("click", menuChild);
    __defers["$.__views.__alloyId34!click!openEventForm"] && $.__views.__alloyId34.addEventListener("click", openEventForm);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;