function Controller() {
    function removeAllChildren(viewObject) {
        var children = viewObject.children.slice(0);
        for (var i = 0; children.length > i; ++i) viewObject.remove(children[i]);
    }
    function openEventForm() {
        $.tooltipContainer.hide();
        var eventForm = Alloy.createController("eventForm").getView();
        Titanium.API.fireEvent("openAsNavigation", {
            window: eventForm
        });
    }
    function openCamera(nid) {
        $.tooltipContainer.hide();
        var user = {
            uid: Titanium.App.Properties.getInt("userUid"),
            sessid: Titanium.App.Properties.getString("userSessionId"),
            session_name: Titanium.App.Properties.getString("userSessionName"),
            name: Titanium.App.Properties.getString("userName")
        };
        Titanium.Media.showCamera({
            success: function(event) {
                dupppUpload.addFile(event.media, nid, new Date().getTime(), user.uid);
            },
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Video"
                });
                error.code == Titanium.Media.NO_VIDEO ? a.setMessage("Device does not have video recording capabilities") : a.setMessage("Unexpected error: " + error.code);
                a.show();
            },
            mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
            videoMaximumDuration: 1e4,
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
        $.tooltipContainer.show();
    }
    function openMenu() {
        if (menuOpen) {
            menuOpen = false;
            $.menu.hide();
        } else {
            menuOpen = true;
            $.menu.show();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.navActions = Ti.UI.createView({
        id: "navActions"
    });
    $.__views.navActions && $.addTopLevelView($.__views.navActions);
    $.__views.menuBtn = Ti.UI.createButton({
        backgroundImage: "menuBtn@2x.png",
        top: 5,
        left: 5,
        width: 43.5,
        height: 32.5,
        id: "menuBtn"
    });
    $.__views.navActions.add($.__views.menuBtn);
    openMenu ? $.__views.menuBtn.addEventListener("click", openMenu) : __defers["$.__views.menuBtn!click!openMenu"] = true;
    $.__views.cameraBtn = Ti.UI.createButton({
        backgroundImage: "photoBtn@2x.png",
        top: 5,
        right: 5,
        width: 43.5,
        height: 32.5,
        id: "cameraBtn"
    });
    $.__views.navActions.add($.__views.cameraBtn);
    openTooltip ? $.__views.cameraBtn.addEventListener("click", openTooltip) : __defers["$.__views.cameraBtn!click!openTooltip"] = true;
    $.__views.tooltipContainer = Ti.UI.createView({
        backgroundColor: "#000",
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        opacity: .8,
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
    $.__views.__alloyId15 = Ti.UI.createLabel({
        font: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        top: 15,
        text: "Let's go !",
        id: "__alloyId15"
    });
    $.__views.tooltip.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        font: {
            fontSize: 16,
            fontFamily: "Helvetica Neue"
        },
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: 30,
        left: 30,
        text: "You want to capture in which events ?",
        id: "__alloyId16"
    });
    $.__views.tooltip.add($.__views.__alloyId16);
    $.__views.tableOpen = Ti.UI.createScrollView({
        height: 0,
        width: "100%",
        contentWidth: "100%",
        id: "tableOpen",
        layout: "vertical",
        visible: "false"
    });
    $.__views.tooltip.add($.__views.tableOpen);
    $.__views.tableOpenLabel = Ti.UI.createLabel({
        font: {
            fontSize: 16,
            fontFamily: "Helvetica Neue"
        },
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: 30,
        left: 30,
        id: "tableOpenLabel",
        text: "or",
        visible: "false"
    });
    $.__views.tooltip.add($.__views.tableOpenLabel);
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
    openEventForm ? $.__views.__alloyId17.addEventListener("click", openEventForm) : __defers["$.__views.__alloyId17!click!openEventForm"] = true;
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
    $.__views.__alloyId18 = Ti.UI.createButton({
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
        id: "__alloyId18"
    });
    $.__views.menu.add($.__views.__alloyId18);
    menuChild ? $.__views.__alloyId18.addEventListener("click", menuChild) : __defers["$.__views.__alloyId18!click!menuChild"] = true;
    $.__views.__alloyId19 = Ti.UI.createButton({
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
        id: "__alloyId19"
    });
    $.__views.menu.add($.__views.__alloyId19);
    menuChild ? $.__views.__alloyId19.addEventListener("click", menuChild) : __defers["$.__views.__alloyId19!click!menuChild"] = true;
    $.__views.__alloyId20 = Ti.UI.createButton({
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
        id: "__alloyId20"
    });
    $.__views.menu.add($.__views.__alloyId20);
    menuChild ? $.__views.__alloyId20.addEventListener("click", menuChild) : __defers["$.__views.__alloyId20!click!menuChild"] = true;
    $.__views.__alloyId21 = Ti.UI.createButton({
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
        id: "__alloyId21"
    });
    $.__views.menu.add($.__views.__alloyId21);
    menuChild ? $.__views.__alloyId21.addEventListener("click", menuChild) : __defers["$.__views.__alloyId21!click!menuChild"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var dupppUpload = (Alloy.CFG.rest, require("dupppUpload"));
    $.tooltipContainer.addEventListener("click", function(e) {
        "tooltipContainer" === e.source.id && $.tooltipContainer.hide();
    });
    var menuOpen = false;
    Titanium.API.addEventListener("myEvents:fetched", function(data) {
        removeAllChildren($.tableOpen);
        $.tableOpen.height = 0;
        $.tableOpen.hide();
        $.tableOpenLabel.hide();
        data.data.length > 0 && data.data.forEach(function(event) {
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
            $.tableOpen.height = 100;
            $.tableOpen.show();
            $.tableOpenLabel.show();
        });
    });
    __defers["$.__views.menuBtn!click!openMenu"] && $.__views.menuBtn.addEventListener("click", openMenu);
    __defers["$.__views.cameraBtn!click!openTooltip"] && $.__views.cameraBtn.addEventListener("click", openTooltip);
    __defers["$.__views.__alloyId17!click!openEventForm"] && $.__views.__alloyId17.addEventListener("click", openEventForm);
    __defers["$.__views.__alloyId18!click!menuChild"] && $.__views.__alloyId18.addEventListener("click", menuChild);
    __defers["$.__views.__alloyId19!click!menuChild"] && $.__views.__alloyId19.addEventListener("click", menuChild);
    __defers["$.__views.__alloyId20!click!menuChild"] && $.__views.__alloyId20.addEventListener("click", menuChild);
    __defers["$.__views.__alloyId21!click!menuChild"] && $.__views.__alloyId21.addEventListener("click", menuChild);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;