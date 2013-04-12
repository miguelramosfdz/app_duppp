function Controller() {
    function close() {
        indicator.openIndicator();
        ajax({
            type: "POST",
            url: url,
            dataType: "json",
            contentType: "application/json",
            success: function(data) {
                indicator.closeIndicator();
                Titanium.API.fireEvent("eventCreated");
            },
            error: function(data) {
                indicator.closeIndicator();
                alert("Sorry, your event cannot be closed.");
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "row"
    });
    $.addTopLevelView($.__views.row);
    $.__views.title = Ti.UI.createLabel({
        color: "#353535",
        font: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        id: "title",
        left: "10"
    });
    $.__views.row.add($.__views.title);
    $.__views.button = Ti.UI.createButton({
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
        font: {
            fontSize: 16,
            fontFamily: "Helvetica Neue"
        },
        right: 10,
        width: 80,
        top: 10,
        bottom: 10,
        height: 30,
        borderRadius: 5,
        shadowColor: "#999",
        shadowOffset: {
            x: 0,
            y: 1
        },
        id: "button",
        title: "Publish"
    });
    $.__views.row.add($.__views.button);
    close ? $.__views.button.addEventListener("click", close) : __defers["$.__views.button!click!close"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    Ti.include("tiajax.js");
    var data = [], ajax = Titanium.Network.ajax, args = arguments[0] || {}, url = REST_PATH + "/event/" + args.nid + "/close", uie = require("UiElements"), indicator = uie.createIndicatorWindow();
    $.title.text = args.title;
    __defers["$.__views.button!click!close"] && $.__views.button.addEventListener("click", close);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;