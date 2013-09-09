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
        Ti.Media.showCamera({
            success: function(event) {
                dupppUpload.addFile(event.media, nid, new Date().getTime(), user.uid);
                container.button.title = "Capture";
                container.cameraType.visible = true;
                container.cameraFlash.visible = true;
            },
            error: function(error) {
                var a = Titanium.UI.createAlertDialog({
                    title: "Video"
                });
                error.code == Titanium.Media.NO_VIDEO ? a.setMessage("Device does not have video recording capabilities") : a.setMessage("Unexpected error: " + error.code);
                a.show();
            },
            mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
            videoQuality: Titanium.Media.QUALITY_MEDIUM,
            overlay: container.overlay,
            showControls: false
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
        width: 37,
        height: 28,
        id: "menuBtn"
    });
    $.__views.navActions.add($.__views.menuBtn);
    openMenu ? $.__views.menuBtn.addEventListener("click", openMenu) : __defers["$.__views.menuBtn!click!openMenu"] = true;
    $.__views.cameraBtn = Ti.UI.createButton({
        backgroundImage: "photoBtn@2x.png",
        width: 37,
        height: 33,
        id: "cameraBtn"
    });
    $.__views.navActions.add($.__views.cameraBtn);
    openTooltip ? $.__views.cameraBtn.addEventListener("click", openTooltip) : __defers["$.__views.cameraBtn!click!openTooltip"] = true;
    $.__views.tooltipContainer = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: Titanium.UI.FILL,
        zIndex: 5,
        id: "tooltipContainer",
        visible: "false"
    });
    $.__views.navActions.add($.__views.tooltipContainer);
    $.__views.tooltip = Ti.UI.createView({
        backgroundColor: "#34495e",
        width: 300,
        height: Titanium.UI.SIZE,
        zIndex: 6,
        borderRadius: 5,
        id: "tooltip",
        layout: "vertical"
    });
    $.__views.tooltipContainer.add($.__views.tooltip);
    $.__views.__alloyId21 = Ti.UI.createLabel({
        font: {
            fontSize: 18,
            fontFamily: "Lato-Regular"
        },
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        top: 15,
        text: "Let's go !",
        id: "__alloyId21"
    });
    $.__views.tooltip.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        font: {
            fontSize: 16,
            fontFamily: "Lato-Light"
        },
        color: "white",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        right: 30,
        left: 30,
        text: "You want to capture in which events ?",
        id: "__alloyId22"
    });
    $.__views.tooltip.add($.__views.__alloyId22);
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
            fontFamily: "Lato-Light"
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
    $.__views.__alloyId23 = Ti.UI.createButton({
        backgroundImage: "none",
        font: {
            fontSize: 18,
            fontFamily: "Lato-Regular"
        },
        backgroundColor: "#2ecc71",
        width: Titanium.UI.FILL,
        right: 10,
        bottom: 10,
        top: 10,
        height: 40,
        borderRadius: 5,
        left: 10,
        title: "Create Event",
        id: "__alloyId23"
    });
    $.__views.tooltip.add($.__views.__alloyId23);
    openEventForm ? $.__views.__alloyId23.addEventListener("click", openEventForm) : __defers["$.__views.__alloyId23!click!openEventForm"] = true;
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
    $.__views.__alloyId24 = Ti.UI.createButton({
        backgroundImage: "none",
        height: 40,
        width: Titanium.UI.FILL,
        font: {
            fontSize: 18,
            fontFamily: "Lato-Regular"
        },
        index: "0",
        title: "Home",
        id: "__alloyId24"
    });
    $.__views.menu.add($.__views.__alloyId24);
    menuChild ? $.__views.__alloyId24.addEventListener("click", menuChild) : __defers["$.__views.__alloyId24!click!menuChild"] = true;
    $.__views.__alloyId25 = Ti.UI.createButton({
        backgroundImage: "none",
        height: 40,
        width: Titanium.UI.FILL,
        font: {
            fontSize: 18,
            fontFamily: "Lato-Regular"
        },
        index: "1",
        title: "My Events",
        id: "__alloyId25"
    });
    $.__views.menu.add($.__views.__alloyId25);
    menuChild ? $.__views.__alloyId25.addEventListener("click", menuChild) : __defers["$.__views.__alloyId25!click!menuChild"] = true;
    $.__views.__alloyId26 = Ti.UI.createButton({
        backgroundImage: "none",
        height: 40,
        width: Titanium.UI.FILL,
        font: {
            fontSize: 18,
            fontFamily: "Lato-Regular"
        },
        index: "2",
        title: "Explore",
        id: "__alloyId26"
    });
    $.__views.menu.add($.__views.__alloyId26);
    menuChild ? $.__views.__alloyId26.addEventListener("click", menuChild) : __defers["$.__views.__alloyId26!click!menuChild"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var dupppUpload = (Alloy.CFG.rest, require("dupppUpload")), container = {};
    container.button = Titanium.UI.createButton({
        color: "#fff",
        backgroundImage: "/images/BUTT_grn_on.png",
        backgroundSelectedImage: "/images/BUTT_grn_off.png",
        backgroundDisabledImage: "/images/BUTT_gry_on.png",
        bottom: 10,
        width: 120,
        height: 40,
        font: {
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        title: "Capture"
    });
    container.closebutton = Titanium.UI.createButton({
        color: "#fff",
        backgroundImage: "/images/BUTT_red_on.png",
        backgroundSelectedImage: "/images/BUTT_red_off.png",
        backgroundDisabledImage: "/images/BUTT_gry_on.png",
        top: 10,
        width: 120,
        height: 40,
        font: {
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        title: "Close cameras"
    });
    container.overlay = Titanium.UI.createView();
    container.overlay.add(container.button);
    container.overlay.add(container.closebutton);
    container.cameraFlash = Ti.UI.createButton({
        color: "#fff",
        title: "auto",
        left: 20,
        top: 20,
        height: 40,
        width: 80,
        backgroundImage: "/images/BUTT_drk_on.png",
        font: {
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        }
    });
    container.overlay.add(container.cameraFlash);
    container.current = Ti.Media.CAMERA_FLASH_AUTO;
    container.cameraFlashModes = Ti.Media.availableCameraFlashModes;
    container.cameraFlash.addEventListener("click", function() {
        if (Ti.Media.cameraFlashMode == Ti.Media.CAMERA_FLASH_AUTO) {
            container.cameraFlash.title = "on";
            Ti.Media.cameraFlashMode = Ti.Media.CAMERA_FLASH_ON;
        } else if (Ti.Media.cameraFlashMode == Ti.Media.CAMERA_FLASH_ON) {
            container.cameraFlash.title = "off";
            Ti.Media.cameraFlashMode = Ti.Media.CAMERA_FLASH_OFF;
        } else {
            container.cameraFlash.title = "auto";
            Ti.Media.cameraFlashMode = Ti.Media.CAMERA_FLASH_AUTO;
        }
    });
    container.cameraType = Ti.UI.createButton({
        color: "#fff",
        title: "front",
        top: 20,
        right: 20,
        height: 40,
        width: 80,
        backgroundImage: "/images/BUTT_drk_on.png",
        font: {
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        }
    });
    container.cameras = Ti.Media.availableCameras;
    for (var c = 0; container.cameras.length > c; c++) if (container.cameras[c] == Ti.Media.CAMERA_REAR) {
        container.overlay.add(container.cameraType);
        container.cameraType.addEventListener("click", function() {
            if (Ti.Media.camera == Ti.Media.CAMERA_FRONT) {
                container.cameraType.title = "front";
                Ti.Media.switchCamera(Ti.Media.CAMERA_REAR);
            } else {
                container.cameraType.title = "rear";
                Ti.Media.switchCamera(Ti.Media.CAMERA_FRONT);
            }
        });
        break;
    }
    container.button.addEventListener("click", function() {
        Ti.Media.startVideoCapture();
        container.button.title = "Stop Video";
        container.button.backgroundImage = "/images/BUTT_red_on.png";
        container.button.backgroundSelectedImage = "/images/BUTT_red_off.png";
        container.cameraType.visible = false;
        container.cameraFlash.visible = false;
    });
    container.closebutton.addEventListener("click", function() {
        Ti.Media.hideCamera();
        container.button.title = "Capture";
        container.button.backgroundImage = "/images/BUTT_red_on.png";
        container.button.backgroundSelectedImage = "/images/BUTT_red_off.png";
        container.cameraType.visible = true;
        container.cameraFlash.visible = true;
    });
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
            var label = event.title;
            event.uid != Titanium.App.Properties.getInt("userUid") && (label = event.title + " - " + event.name);
            var openItem = Titanium.UI.createButton({
                title: label,
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
    __defers["$.__views.__alloyId23!click!openEventForm"] && $.__views.__alloyId23.addEventListener("click", openEventForm);
    __defers["$.__views.__alloyId24!click!menuChild"] && $.__views.__alloyId24.addEventListener("click", menuChild);
    __defers["$.__views.__alloyId25!click!menuChild"] && $.__views.__alloyId25.addEventListener("click", menuChild);
    __defers["$.__views.__alloyId26!click!menuChild"] && $.__views.__alloyId26.addEventListener("click", menuChild);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;