function Controller() {
    function close() {
        if (0 === medias.length) {
            indicator.openIndicator();
            drupalServices.closeNode({
                nid: args.nid,
                success: function() {
                    indicator.closeIndicator();
                    Titanium.API.fireEvent("eventCreated");
                },
                error: function() {
                    indicator.closeIndicator();
                    alert("Sorry, your event cannot be closed.");
                }
            });
        } else alert("Sorry, your cannot close your event, because some videos need to be uploaded.");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "eventOpenRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.title = Ti.UI.createLabel({
        color: "#2C3E50",
        font: {
            fontSize: 18,
            fontFamily: "Lato-Regular"
        },
        id: "title",
        left: "10"
    });
    $.__views.row.add($.__views.title);
    $.__views.button = Ti.UI.createButton({
        backgroundImage: "none",
        backgroundColor: "#3498DB",
        font: {
            fontSize: 16,
            fontFamily: "Lato-Regular"
        },
        right: 10,
        width: 80,
        top: 10,
        bottom: 10,
        height: 30,
        borderRadius: 5,
        id: "button",
        title: "Publish"
    });
    $.__views.row.add($.__views.button);
    close ? $.__views.button.addEventListener("click", close) : __defers["$.__views.button!click!close"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, drupalServices = require("drupalServices");
    var uie = require("UiElements");
    var indicator = uie.createIndicatorWindow();
    $.title.text = args.title;
    args.uid != Titanium.App.Properties.getInt("userUid") && $.button.hide();
    __defers["$.__views.button!click!close"] && $.__views.button.addEventListener("click", close);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;