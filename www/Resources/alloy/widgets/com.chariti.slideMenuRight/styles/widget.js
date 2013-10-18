function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.chariti.slideMenuRight/" + s : s.substring(0, index) + "/com.chariti.slideMenuRight/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0044,
    key: "Wrapper",
    style: {
        width: "80%",
        top: "0dp",
        right: "-80%",
        backgroundColor: "#000"
    }
}, {
    isId: true,
    priority: 100000.0045,
    key: "Tabs",
    style: {
        top: "0dp",
        backgroundColor: "#111",
        separatorColor: "#222",
        separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE
    }
} ];