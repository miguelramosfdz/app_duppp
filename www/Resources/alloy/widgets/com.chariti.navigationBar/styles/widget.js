function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.chariti.navigationBar/" + s : s.substring(0, index) + "/com.chariti.navigationBar/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0015,
    key: "Wrapper",
    style: {
        top: "0dp",
        left: "0dp",
        width: Ti.UI.FILL,
        height: "47dp",
        backgroundColor: "#000"
    }
}, {
    isId: true,
    priority: 100000.0016,
    key: "border",
    style: {
        bottom: "0dp",
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundColor: "#000",
        opacity: .2
    }
}, {
    isId: true,
    priority: 100000.0017,
    key: "overlay",
    style: {
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        left: "0dp",
        top: "0dp"
    }
}, {
    isId: true,
    priority: 100000.0018,
    key: "left",
    style: {
        top: "0dp",
        left: "0dp",
        width: "48dp",
        height: "47dp"
    }
}, {
    isId: true,
    priority: 100000.0019,
    key: "leftImage",
    style: {
        top: "9dp",
        left: "9dp",
        width: "28dp",
        height: "28dp"
    }
}, {
    isId: true,
    priority: 100000.002,
    key: "back",
    style: {
        top: "0dp",
        left: "0dp",
        width: "48dp",
        height: "47dp"
    }
}, {
    isId: true,
    priority: 100000.0021,
    key: "backImage",
    style: {
        top: "9dp",
        left: "9dp",
        width: "28dp",
        height: "28dp",
        image: WPATH("images/back.png"),
        preventDefaultImage: true
    }
}, {
    isId: true,
    priority: 100000.0022,
    key: "next",
    style: {
        top: "0dp",
        right: "0dp",
        width: "48dp",
        height: "47dp"
    }
}, {
    isId: true,
    priority: 100000.0023,
    key: "nextImage",
    style: {
        top: "9dp",
        right: "9dp",
        width: "28dp",
        height: "28dp",
        image: WPATH("images/next.png"),
        preventDefaultImage: true
    }
}, {
    isId: true,
    priority: 100000.0024,
    key: "right",
    style: {
        top: "0dp",
        right: "0dp",
        width: "48dp",
        height: "47dp"
    }
}, {
    isId: true,
    priority: 100000.0025,
    key: "rightImage",
    style: {
        top: "9dp",
        left: "10dp",
        width: "28dp",
        height: "28dp"
    }
}, {
    isId: true,
    priority: 100000.0026,
    key: "rightText",
    style: {
        top: "0dp",
        right: "0dp",
        width: Ti.UI.SIZE
    }
}, {
    isId: true,
    priority: 100000.0027,
    key: "rightLabel",
    style: {
        top: "9dp",
        right: "10dp",
        width: "65",
        color: "#FFF"
    }
} ];