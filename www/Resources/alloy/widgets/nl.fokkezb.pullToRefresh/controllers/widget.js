function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.pullToRefresh/" + s : s.substring(0, index) + "/nl.fokkezb.pullToRefresh/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function doShow(msg) {
        if (!initted || pulled) return false;
        pulled = true;
        $.status.text = msg || options.msgUpdating;
        $.arrow.hide();
        $.activityIndicator.show();
        options.table.setContentInsets({
            top: 80
        }, {
            animated: true
        });
        return true;
    }
    function doHide() {
        if (!initted || !pulled) return false;
        options.table.setContentInsets({
            top: 0
        }, {
            animated: true
        });
        $.activityIndicator.hide();
        $.arrow.transform = Ti.UI.create2DMatrix();
        $.arrow.show();
        $.status.text = options.msgPull;
        pulled = false;
    }
    function setDate(date) {
        if (!initted) return false;
        if (false === date) $.updated.hide(); else {
            $.updated.show();
            true !== date && ($.updated.text = String.format(options.msgUpdated, String.formatDate(date, "short"), String.formatTime(date, "short")));
        }
    }
    function doTrigger() {
        if (!initted || loading) return false;
        loading = true;
        doShow();
        options.loader(finishLoading);
    }
    function finishLoading(success) {
        success && setDate(new Date());
        doHide();
        loading = false;
    }
    function scrollListener(e) {
        offset = e.contentOffset.y;
        if (pulled) return;
        if (pulling && !loading && offset > -80 && 0 > offset) {
            pulling = false;
            var unrotate = Ti.UI.create2DMatrix();
            $.arrow.animate({
                transform: unrotate,
                duration: 180
            });
            $.status.text = options.msgPull;
        } else if (!pulling && !loading && -80 > offset) {
            pulling = true;
            var rotate = Ti.UI.create2DMatrix().rotate(180);
            $.arrow.animate({
                transform: rotate,
                duration: 180
            });
            $.status.text = options.msgRelease;
        }
    }
    function dragEndListener() {
        if (!pulled && pulling && !loading && -80 > offset) {
            pulling = false;
            doTrigger();
        }
    }
    function doInit(args) {
        if (initted || false) return false;
        initted = true;
        options = _.defaults(args, {
            msgPull: "Pull down to refresh...",
            msgRelease: "Release to refresh...",
            msgUpdating: "Updating...",
            msgUpdated: "Last Updated: %s %s"
        });
        options.table.setHeaderPullView($.headerPullView);
        options.table.addEventListener("scroll", scrollListener);
        options.table.addEventListener("dragEnd", dragEndListener);
    }
    function doRemove() {
        if (!initted) return false;
        options.table.setHeaderPullView(null);
        options.table.removeEventListener("scroll", scrollListener);
        options.table.removeEventListener("dragEnd", dragEndListener);
        options = null;
        initted = false;
        pulling = false;
        loading = false;
        shown = false;
        offset = 0;
    }
    new (require("alloy/widget"))("nl.fokkezb.pullToRefresh");
    this.__widgetId = "nl.fokkezb.pullToRefresh";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.headerPullView = Ti.UI.createView({
        backgroundColor: "#e2e7ed",
        top: 0,
        right: 0,
        left: 0,
        height: 60,
        id: "headerPullView"
    });
    $.__views.headerPullView && $.addTopLevelView($.__views.headerPullView);
    $.__views.arrow = Ti.UI.createImageView({
        left: 20,
        bottom: 10,
        width: 23,
        height: 60,
        image: WPATH("images/whiteArrow.png"),
        id: "arrow"
    });
    $.__views.headerPullView.add($.__views.arrow);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        left: 20,
        bottom: 13,
        width: 30,
        height: 30,
        id: "activityIndicator"
    });
    $.__views.headerPullView.add($.__views.activityIndicator);
    $.__views.status = Ti.UI.createLabel({
        color: "#576c89",
        font: {
            fontSize: 13,
            fontWeight: "bold"
        },
        text: "Pull down to refresh",
        textAlign: "center",
        left: 55,
        bottom: 30,
        width: 200,
        id: "status"
    });
    $.__views.headerPullView.add($.__views.status);
    $.__views.updated = Ti.UI.createLabel({
        color: "#576c89",
        font: {
            fontSize: 12
        },
        textAlign: "center",
        left: 55,
        bottom: 15,
        width: 200,
        id: "updated"
    });
    $.__views.headerPullView.add($.__views.updated);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var options = null;
    var initted = false;
    var pulling = false;
    var pulled = false;
    var loading = false;
    var offset = 0;
    args.table && args.loader && doInit(args);
    exports.init = doInit;
    exports.show = doShow;
    exports.hide = doHide;
    exports.date = setDate;
    exports.trigger = doTrigger;
    exports.remove = doRemove;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;