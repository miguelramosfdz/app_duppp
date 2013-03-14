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
    $.__views.__alloyId10 = Ti.UI.createButton({
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
        id: "__alloyId10"
    });
    $.__views.menu.add($.__views.__alloyId10);
    menuChild ? $.__views.__alloyId10.addEventListener("click", menuChild) : __defers["$.__views.__alloyId10!click!menuChild"] = !0;
    $.__views.__alloyId11 = Ti.UI.createButton({
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
        id: "__alloyId11"
    });
    $.__views.menu.add($.__views.__alloyId11);
    menuChild ? $.__views.__alloyId11.addEventListener("click", menuChild) : __defers["$.__views.__alloyId11!click!menuChild"] = !0;
    $.__views.__alloyId12 = Ti.UI.createButton({
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
        id: "__alloyId12"
    });
    $.__views.menu.add($.__views.__alloyId12);
    menuChild ? $.__views.__alloyId12.addEventListener("click", menuChild) : __defers["$.__views.__alloyId12!click!menuChild"] = !0;
    $.__views.__alloyId13 = Ti.UI.createButton({
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
        id: "__alloyId13"
    });
    $.__views.menu.add($.__views.__alloyId13);
    menuChild ? $.__views.__alloyId13.addEventListener("click", menuChild) : __defers["$.__views.__alloyId13!click!menuChild"] = !0;
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
    $.__views.tooltipContainer = Ti.UI.createView({
        backgroundColor: "#000",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        opacity: 0.8,
        zIndex: 1,
        id: "tooltipContainer",
        visible: "false"
    });
    $.__views.navActions.add($.__views.tooltipContainer);
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
    $.__views.__alloyId14 = Ti.UI.createLabel({
        font: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        top: 15,
        text: "Let's go !",
        id: "__alloyId14"
    });
    $.__views.tooltip.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        font: {
            fontSize: 16,
            fontFamily: "Helvetica Neue"
        },
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: 30,
        left: 30,
        text: "You want to capture in which events ?",
        id: "__alloyId15"
    });
    $.__views.tooltip.add($.__views.__alloyId15);
    $.__views.tableOpen = Ti.UI.createScrollView({
        height: 80,
        width: "100%",
        contentWidth: "100%",
        id: "tableOpen",
        layout: "vertical"
    });
    $.__views.tooltip.add($.__views.tableOpen);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        font: {
            fontSize: 16,
            fontFamily: "Helvetica Neue"
        },
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: 30,
        left: 30,
        text: "or",
        id: "__alloyId16"
    });
    $.__views.tooltip.add($.__views.__alloyId16);
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
    $.__views.tooltip.add($.__views.__alloyId17);
    openEventForm ? $.__views.__alloyId17.addEventListener("click", openEventForm) : __defers["$.__views.__alloyId17!click!openEventForm"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    Ti.include("tiajax.js");
    var data = [], url = REST_PATH + "/events/my_events.json", ajax = Titanium.Network.ajax, xhr = Ti.Network.createHTTPClient({
        onload: function(e) {
            removeAllChildren($.tableOpen);
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
                    bottom: 10,
                    height: 40,
                    borderRadius: 5,
                    left: 10,
                    shadowColor: "#999",
                    shadowOffset: {
                        x: 0,
                        y: 1
                    }
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
    __defers["$.__views.menuBtn!click!openMenu"] && $.__views.menuBtn.addEventListener("click", openMenu);
    __defers["$.__views.__alloyId10!click!menuChild"] && $.__views.__alloyId10.addEventListener("click", menuChild);
    __defers["$.__views.__alloyId11!click!menuChild"] && $.__views.__alloyId11.addEventListener("click", menuChild);
    __defers["$.__views.__alloyId12!click!menuChild"] && $.__views.__alloyId12.addEventListener("click", menuChild);
    __defers["$.__views.__alloyId13!click!menuChild"] && $.__views.__alloyId13.addEventListener("click", menuChild);
    __defers["$.__views.cameraBtn!click!openTooltip"] && $.__views.cameraBtn.addEventListener("click", openTooltip);
    __defers["$.__views.__alloyId17!click!openEventForm"] && $.__views.__alloyId17.addEventListener("click", openEventForm);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;