function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "commentForm";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        backgroundColor: "#F3F3F3",
        layout: "vertical",
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.NavigationBar = Alloy.createWidget("com.chariti.navigationBar", "widget", {
        id: "NavigationBar",
        text: "Comments",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.__alloyId0 = Ti.UI.createView({
        id: "__alloyId0"
    });
    $.__views.Wrapper.add($.__views.__alloyId0);
    $.__views.tableWrapper = Ti.UI.createView({
        height: "92%",
        top: 0,
        id: "tableWrapper"
    });
    $.__views.__alloyId0.add($.__views.tableWrapper);
    $.__views.table = Ti.UI.createTableView({
        top: 0,
        height: Titanium.UI.FILL,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        position: Ti.UI.iPhone.TableViewScrollPosition.BOTTOM,
        id: "table",
        allowsSelection: "false"
    });
    $.__views.tableWrapper.add($.__views.table);
    $.__views.textWrapper = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "#F3F3F3",
        bottom: 0,
        id: "textWrapper"
    });
    $.__views.__alloyId0.add($.__views.textWrapper);
    $.__views.textContent = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "textContent",
        layout: "horizontal"
    });
    $.__views.textWrapper.add($.__views.textContent);
    $.__views.textArea = Ti.UI.createTextArea({
        color: "#888",
        textAlign: "left",
        value: "Your comment",
        height: Ti.UI.SIZE,
        width: "80%",
        top: 5,
        bottom: 5,
        id: "textArea"
    });
    $.__views.textContent.add($.__views.textArea);
    $.__views.button = Ti.UI.createButton({
        width: Ti.UI.FILL,
        bottom: 5,
        height: 30,
        backgroundColor: "#27ae60",
        backgroundImage: "none",
        font: {
            fontSize: "14dp",
            fontFamily: "Lato-Regular"
        },
        id: "button",
        title: "Send"
    });
    $.__views.textContent.add($.__views.button);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var drupalServices = require("drupalServices");
    var APP = require("core");
    var CONFIG = arguments[0] || {};
    var isFirst = true;
    $.init = function() {
        APP.log("debug", "event_event.init | " + JSON.stringify(CONFIG));
        $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");
        $.NavigationBar.showBack({
            callback: function() {
                APP.removeChild(true);
                $.textArea.blur();
            }
        });
        480 == APP.Device.height && ($.tableWrapper.height = "90%");
        $.retrieveData();
    };
    $.retrieveData = function() {
        APP.openLoading();
        drupalServices.nodeRetrieveComments({
            nid: CONFIG.nid,
            success: function(json) {
                $.handleData(json);
                APP.closeLoading();
            },
            error: function() {
                APP.closeLoading();
            }
        });
    };
    $.handleData = function(_data) {
        var position, tableData = [];
        for (var key in _data) {
            var newsItem = Alloy.createController("commentRow", _data[key]).getView();
            tableData.push(newsItem);
        }
        $.table.setData(tableData);
        position = tableData.length - 1;
        $.table.scrollToIndex(position);
    };
    $.addComment = function(_data) {
        "" !== _data && "Your comment" !== _data && drupalServices.createComment({
            node: {
                nid: CONFIG.nid,
                subject: CONFIG.nid,
                comment_body: {
                    und: [ {
                        value: _data
                    } ]
                }
            },
            success: function() {
                $.textArea.blur();
                $.textArea.value = "Your comment";
                $.button.backgroundColor = "#27ae60";
                $.textWrapper.bottom = 0;
                $.retrieveData();
            },
            error: function() {
                alert("There was an error, try again.");
            }
        });
    };
    $.textArea.addEventListener("focus", function() {
        if (isFirst) {
            $.textArea.value = "";
            isFirst = false;
        }
        $.textWrapper.bottom = 480 == APP.Device.height ? "52%" : "43%";
    });
    $.textArea.addEventListener("return", function() {
        $.textWrapper.bottom = 0;
    });
    $.button.addEventListener("click", function() {
        $.button.backgroundColor = "#16a085";
        $.addComment($.textArea.value.trim());
    });
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;