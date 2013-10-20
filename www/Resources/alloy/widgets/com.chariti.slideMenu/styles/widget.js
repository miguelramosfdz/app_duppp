function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.chariti.slideMenu/" + s : s.substring(0, index) + "/com.chariti.slideMenu/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0041,
    key: "Wrapper",
    style: {
        width: "80%",
        top: "0dp",
        left: "-80%",
        backgroundColor: "#2c3e50"
    }
}, {
    isId: true,
    priority: 100000.0042,
    key: "Tabs",
    style: {
        top: "0dp",
        backgroundColor: "#2c3e50",
        separatorColor: "#34495e",
        separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE
    }
} ];