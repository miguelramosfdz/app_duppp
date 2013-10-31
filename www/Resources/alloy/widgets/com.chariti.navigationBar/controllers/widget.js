function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.chariti.navigationBar/" + s : s.substring(0, index) + "/com.chariti.navigationBar/" + s.substring(index + 1);
    return path;
}

function Controller() {
    new (require("alloy/widget"))("com.chariti.navigationBar");
    this.__widgetId = "com.chariti.navigationBar";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        width: Ti.UI.FILL,
        height: "47dp",
        backgroundColor: "#000",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.overlay = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        left: "0dp",
        top: "0dp",
        id: "overlay"
    });
    $.__views.Wrapper.add($.__views.overlay);
    $.__views.back = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        width: "48dp",
        height: "47dp",
        id: "back",
        visible: "false"
    });
    $.__views.overlay.add($.__views.back);
    $.__views.backImage = Ti.UI.createImageView({
        top: "9dp",
        left: "9dp",
        width: "28dp",
        height: "28dp",
        image: WPATH("images/back.png"),
        preventDefaultImage: true,
        id: "backImage"
    });
    $.__views.back.add($.__views.backImage);
    $.__views.next = Ti.UI.createView({
        top: "0dp",
        right: "0dp",
        width: "48dp",
        height: "47dp",
        id: "next",
        visible: "false"
    });
    $.__views.overlay.add($.__views.next);
    $.__views.nextImage = Ti.UI.createImageView({
        top: "9dp",
        right: "9dp",
        width: "28dp",
        height: "28dp",
        image: WPATH("images/next.png"),
        preventDefaultImage: true,
        id: "nextImage"
    });
    $.__views.next.add($.__views.nextImage);
    $.__views.left = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        width: "48dp",
        height: "47dp",
        id: "left",
        visible: "false"
    });
    $.__views.overlay.add($.__views.left);
    $.__views.leftImage = Ti.UI.createImageView({
        top: "9dp",
        left: "9dp",
        width: "28dp",
        height: "28dp",
        id: "leftImage"
    });
    $.__views.left.add($.__views.leftImage);
    $.__views.right = Ti.UI.createView({
        top: "0dp",
        right: "0dp",
        width: "48dp",
        height: "47dp",
        id: "right",
        visible: "false"
    });
    $.__views.overlay.add($.__views.right);
    $.__views.rightImage = Ti.UI.createImageView({
        top: "9dp",
        left: "10dp",
        width: "28dp",
        height: "28dp",
        id: "rightImage"
    });
    $.__views.right.add($.__views.rightImage);
    $.__views.rightText = Ti.UI.createView({
        top: "0dp",
        right: "0dp",
        width: Ti.UI.SIZE,
        id: "rightText",
        visible: "false"
    });
    $.__views.overlay.add($.__views.rightText);
    $.__views.rightLabel = Ti.UI.createButton({
        top: "9dp",
        right: "10dp",
        width: "65",
        color: "#FFF",
        id: "rightLabel"
    });
    $.__views.rightText.add($.__views.rightLabel);
    $.__views.border = Ti.UI.createView({
        bottom: "0dp",
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundColor: "#000",
        opacity: .2,
        id: "border"
    });
    $.__views.Wrapper.add($.__views.border);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var CONFIG = arguments[0] || {};
    if (CONFIG.image) {
        var image = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, CONFIG.image);
        image = image.exists() ? image.nativePath : "/data/" + CONFIG.image;
        $.title = Ti.UI.createImageView({
            image: image,
            height: "26dp",
            width: Ti.UI.SIZE,
            top: true && APP.Device.versionMajor >= 7 ? "30dp" : "10dp",
            bottom: "10dp",
            preventDefaultImage: true
        });
    } else $.title = Ti.UI.createLabel({
        top: true && APP.Device.versionMajor >= 7 ? "20dp" : "0dp",
        left: "58dp",
        right: "58dp",
        height: "46dp",
        font: {
            fontSize: "18dp",
            fontFamily: "HelveticaNeue-Medium"
        },
        color: "#FFF",
        textAlign: "center",
        text: CONFIG.text ? CONFIG.text : ""
    });
    $.addNavigation = function(_view) {
        $.Wrapper.add(_view);
    };
    $.setBackgroundColor = function(_color) {
        $.Wrapper.backgroundColor = _color;
    };
    $.setTitle = function(_text) {
        $.title.text = _text;
    };
    $.showBack = function(_params) {
        $.back.visible = true;
        _params && "undefined" != typeof _params.callback ? $.back.addEventListener("click", _params.callback) : $.back.addEventListener("click", function() {
            APP.removeChild();
        });
    };
    $.showNext = function(_params) {
        $.next.visible = true;
        $.next.addEventListener("click", _params.callback);
    };
    $.showLeft = function(_params) {
        $.left.visible = true;
        $.leftImage.image = _params.image;
        $.left.addEventListener("click", _params.callback);
    };
    $.showRight = function(_params) {
        $.right.visible = true;
        $.rightImage.image = _params.image;
        $.right.addEventListener("click", _params.callback);
    };
    $.showMenu = function() {
        $.showLeft({
            image: WPATH("images/menu.png"),
            callback: APP.toggleMenu
        });
    };
    $.showSettings = function() {
        $.showRight({
            image: WPATH("images/settings.png"),
            callback: APP.openSettings
        });
    };
    $.showDone = function(_params) {
        $.showRight({
            image: WPATH("images/done.png"),
            callback: _params.callback
        });
    };
    $.showClose = function(_params) {
        $.showLeft({
            image: WPATH("images/action.png"),
            callback: _params.callback
        });
    };
    $.showAction = function(_params) {
        $.showRight({
            image: WPATH("images/action.png"),
            callback: _params.callback
        });
    };
    $.showCamera = function() {
        $.showRight({
            image: WPATH("images/photo2.png"),
            callback: APP.toggleMenuRight
        });
    };
    $.showFollow = function(_params) {
        $.rightText.visible = true;
        $.rightLabel.title = _params.text;
        $.rightLabel.addEventListener("click", _params.callback);
    };
    $.Wrapper.add($.title);
    if (true && APP.Device.versionMajor >= 7) {
        $.Wrapper.height = "67dp";
        $.overlay.top = "20dp";
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;