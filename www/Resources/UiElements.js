function createIndicatorWindow(args) {
    function openIndicator() {
        win.open();
        activityIndicator.show();
    }
    function closeIndicator() {
        activityIndicator.hide();
        win.close();
    }
    var width = 110, height = 110;
    var args = args || {};
    var top = args.top || "35%";
    var text = args.text || "Loading";
    var win = Titanium.UI.createWindow({
        height: height,
        width: width,
        top: top,
        borderRadius: 10,
        touchEnabled: false,
        backgroundColor: "#000",
        opacity: .8
    });
    var view = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.FILL,
        center: {
            x: width / 2,
            y: height / 2
        },
        layout: "vertical"
    });
    var activityIndicator = Ti.UI.createActivityIndicator({
        top: 20,
        style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
        width: 30
    });
    var label = Titanium.UI.createLabel({
        text: text,
        color: "#fff",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 16,
            fontWeight: "bold"
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        top: 10
    });
    view.add(activityIndicator);
    view.add(label);
    win.add(view);
    win.openIndicator = openIndicator;
    win.closeIndicator = closeIndicator;
    return win;
}

exports.createIndicatorWindow = createIndicatorWindow;