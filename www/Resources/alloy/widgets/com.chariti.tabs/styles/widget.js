function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.chariti.tabs/" + s : s.substring(0, index) + "/com.chariti.tabs/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0002,
    key: "Wrapper",
    style: {
        height: "60dp",
        bottom: "0dp"
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "TabGroup",
    style: {
        height: "60dp",
        width: Ti.UI.FILL,
        bottom: "0dp"
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "Border",
    style: {
        top: "0dp",
        height: "1dp",
        width: Ti.UI.FILL,
        backgroundColor: "#000",
        opacity: .2
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "IndicatorContainer",
    style: {
        height: "59dp"
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "Indicator",
    style: {
        height: "59dp",
        bottom: "0dp",
        left: "0dp",
        backgroundColor: "#FFF",
        opacity: .4
    }
}, {
    isId: true,
    priority: 100000.0007,
    key: "Overlay",
    style: {
        width: Ti.UI.FILL,
        height: "60dp"
    }
}, {
    isId: true,
    priority: 100000.0008,
    key: "TabContainer",
    style: {
        height: "60dp"
    }
}, {
    isId: true,
    priority: 100000.0009,
    key: "Tabs",
    style: {
        layout: "horizontal",
        height: "60dp",
        width: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.001,
    key: "TabGroupMore",
    style: {
        height: Ti.UI.SIZE,
        bottom: "60dp"
    }
}, {
    isId: true,
    priority: 100000.0011,
    key: "IndicatorMore",
    style: {
        height: "60dp",
        top: "0dp",
        left: "0dp",
        width: Ti.UI.FILL,
        backgroundColor: "#FFF",
        opacity: .4
    }
}, {
    isId: true,
    priority: 100000.0012,
    key: "TabContainerMore",
    style: {
        height: Ti.UI.SIZE,
        right: "0dp"
    }
}, {
    isId: true,
    priority: 100000.0013,
    key: "TabsMore",
    style: {
        layout: "vertical",
        height: Ti.UI.SIZE,
        bottom: "0dp"
    }
} ];