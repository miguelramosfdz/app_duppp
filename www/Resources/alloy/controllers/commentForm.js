function Controller() {
    function close() {
        $.win.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#000",
        backgroundColor: "#F3F3F3",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId1 = Ti.UI.createButton({
        title: "Close",
        id: "__alloyId1"
    });
    close ? $.__views.__alloyId1.addEventListener("click", close) : __defers["$.__views.__alloyId1!click!close"] = true;
    $.__views.win.rightNavButton = $.__views.__alloyId1;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId1!click!close"] && $.__views.__alloyId1.addEventListener("click", close);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;