function Controller() {
    function nextStep() {
        Titanium.API.fireEvent("openAsNavigation", {
            window: $.eventFormWindowStep2
        });
    }
    function createEvent() {
        var clickedRows = [];
        if ($.table.data.length > 0) for (var i = 0; $.table.data[0].rows.length > i; i++) true == $.table.data[0].rows[i].hasCheck && clickedRows.push($.table.data[0].rows[i].uid);
        $.createBtn.enabled = false;
        if (Titanium.App.Properties.getInt("userUid")) {
            var user = {
                uid: Titanium.App.Properties.getInt("userUid"),
                sessid: Titanium.App.Properties.getString("userSessionId"),
                session_name: Titanium.App.Properties.getString("userSessionName"),
                name: Titanium.App.Properties.getString("userName")
            };
            var switchPrivate;
            switchPrivate = 1 == $.switchPrivate.value ? "1" : "0";
            drupalServices.createNode({
                node: {
                    type: "event",
                    title: $.textArea.value,
                    language: "und",
                    group_access: {
                        und: switchPrivate
                    },
                    field_event_date: {
                        und: [ {
                            show_todate: "0",
                            value: {
                                month: "2",
                                day: "14",
                                year: "2013",
                                hour: "20",
                                minute: "15"
                            }
                        } ]
                    },
                    uid: user.uid,
                    status: 1
                },
                success: function(data) {
                    $.eventFormWindow.close();
                    $.eventFormWindowStep2.close({
                        animated: true
                    });
                    $.createBtn.enabled = true;
                    Titanium.API.fireEvent("eventCreated");
                    var join = {
                        uid: clickedRows
                    };
                    drupalServices.joinNode({
                        node: join,
                        nid: data.nid
                    });
                },
                error: function() {
                    alert("There was an error, try again.");
                }
            });
        } else alert("You need to login first");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.eventFormWindow = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#000",
        backgroundColor: "#F3F3F3",
        tabBarHidden: true,
        id: "eventFormWindow",
        title: "New event",
        layout: "vertical"
    });
    $.__views.eventFormWindow && $.addTopLevelView($.__views.eventFormWindow);
    $.__views.textArea = Ti.UI.createTextArea({
        font: {
            fontSize: 13,
            font: "HelveticaNeue"
        },
        color: "#888",
        id: "textArea",
        borderWidth: "1",
        borderColor: "#bbb",
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        textAlign: "left",
        value: "You have to type the title",
        top: "0",
        width: Titanium.UI.FILL,
        height: "150"
    });
    $.__views.eventFormWindow.add($.__views.textArea);
    $.__views.switchPrivate = Ti.UI.createSwitch({
        titleOff: "Public",
        titleOn: "Private",
        id: "switchPrivate",
        title: "Private",
        value: "0"
    });
    $.__views.eventFormWindow.add($.__views.switchPrivate);
    $.__views.__alloyId3 = Ti.UI.createButton({
        title: "Next",
        id: "__alloyId3"
    });
    nextStep ? $.__views.__alloyId3.addEventListener("click", nextStep) : __defers["$.__views.__alloyId3!click!nextStep"] = true;
    $.__views.eventFormWindow.rightNavButton = $.__views.__alloyId3;
    $.__views.eventFormWindowStep2 = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#000",
        backgroundColor: "#F3F3F3",
        tabBarHidden: true,
        id: "eventFormWindowStep2",
        title: "Invite Contact",
        layout: "vertical"
    });
    $.__views.eventFormWindowStep2 && $.addTopLevelView($.__views.eventFormWindowStep2);
    $.__views.search = Ti.UI.createSearchBar({
        barColor: "#000",
        id: "search",
        hintText: "Search a user"
    });
    $.__views.eventFormWindowStep2.add($.__views.search);
    $.__views.table = Ti.UI.createTableView({
        barImage: "bgNavBar.png",
        barColor: "#000",
        backgroundColor: "#F3F3F3",
        tabBarHidden: true,
        id: "table",
        allowsSelectionDuringEditing: "true"
    });
    $.__views.eventFormWindowStep2.add($.__views.table);
    $.__views.createBtn = Ti.UI.createButton({
        id: "createBtn",
        title: "OK"
    });
    createEvent ? $.__views.createBtn.addEventListener("click", createEvent) : __defers["$.__views.createBtn!click!createEvent"] = true;
    $.__views.eventFormWindowStep2.rightNavButton = $.__views.createBtn;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var REST_PATH = Alloy.CFG.rest;
    var data = [], uie = require("UiElements"), indicator = uie.createIndicatorWindow(), drupalServices = require("drupalServices");
    $.textArea.addEventListener("focus", function() {
        $.textArea.value = "";
    });
    $.table.addEventListener("click", function(e) {
        e.row.hasCheck = e.rowData.selected ? false : true;
        e.rowData.selected = !e.rowData.selected;
    });
    var xhrUsers = Ti.Network.createHTTPClient({
        onload: function() {
            data = [];
            json = JSON.parse(this.responseText);
            json.forEach(function(user) {
                if (parseInt(user.uid) !== Titanium.App.Properties.getInt("userUid")) {
                    user.isNoReturn = true;
                    var newsItem = Alloy.createController("userRow", user).getView();
                    data.push(newsItem);
                }
            });
            $.table.setData(data);
            indicator.closeIndicator();
        },
        onerror: function() {},
        timeout: 5e3
    });
    var last_search = null;
    $.search.addEventListener("return", function(e) {
        if (e.value != last_search) {
            last_search = e.value;
            indicator.openIndicator();
            var urlUsers = REST_PATH + "/duppp_user.json?username=" + e.value;
            xhrUsers.open("GET", urlUsers);
            xhrUsers.send();
            $.search.blur();
        }
    });
    __defers["$.__views.__alloyId3!click!nextStep"] && $.__views.__alloyId3.addEventListener("click", nextStep);
    __defers["$.__views.createBtn!click!createEvent"] && $.__views.createBtn.addEventListener("click", createEvent);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;