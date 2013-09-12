function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.pullToRefresh/" + s : s.substring(0, index) + "/nl.fokkezb.pullToRefresh/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0002,
    key: "headerPullView",
    style: {
        backgroundColor: "#e2e7ed",
        top: 0,
        right: 0,
        left: 0,
        height: 60
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "arrow",
    style: {
        left: 20,
        bottom: 10,
        width: 23,
        height: 60,
        image: WPATH("images/whiteArrow.png")
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "activityIndicator",
    style: {
        left: 20,
        bottom: 13,
        width: 30,
        height: 30
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "status",
    style: {
        color: "#576c89",
        font: {
            fontSize: 13,
            fontWeight: "bold"
        },
        text: "Pull down to refresh...",
        textAlign: "center",
        left: 55,
        bottom: 30,
        width: 200
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "updated",
    style: {
        color: "#576c89",
        font: {
            fontSize: 12
        },
        textAlign: "center",
        left: 55,
        bottom: 15,
        width: 200
    }
} ];