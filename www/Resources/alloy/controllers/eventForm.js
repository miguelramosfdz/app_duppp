function Controller() {
    function nextStep() {
        recents.fetch();
        var users = recents.toJSON(), data = [];
        users.forEach(function(user) {
            if (parseInt(user.uid) !== Titanium.App.Properties.getInt("userUid")) {
                user.isNoReturn = true;
                var newsItem = Alloy.createController("userRow", user).getView();
                if (_.indexOf(clickedRows, newsItem.uid) >= 0) {
                    newsItem.hasCheck = true;
                    newsItem.selected = !newsItem.selected;
                }
                data.push(newsItem);
            }
        });
        data.reverse();
        $.table_recent.setData(data);
        Titanium.API.fireEvent("openAsNavigation", {
            window: $.eventFormWindowStep2
        });
    }
    function recentUsers(users) {
        _.each(users, function(user) {
            var model = Alloy.createModel("recent", {
                name: user.name,
                uid: user.uid,
                field_avatar: user.field_avatar
            });
            var isExisting = recents.where({
                name: user.name
            });
            if (0 === isExisting.length) {
                recents.add(model);
                model.save();
            }
        });
    }
    function createEvent() {
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
                    recentUsers(usersSelected);
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
    $.__views.__alloyId2 = Ti.UI.createView({
        backgroundColor: "#ecf0f1",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        id: "__alloyId2"
    });
    $.__views.eventFormWindow.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        color: "#2c3e50",
        font: {
            fontSize: 17,
            fontFamily: "Lato-Regular"
        },
        left: 10,
        height: 50,
        width: "70%",
        text: "Description",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.textArea = Ti.UI.createTextArea({
        font: {
            fontSize: 15,
            fontFamily: "Lato-Regular"
        },
        id: "textArea",
        color: "#888",
        textAlign: "left",
        value: "You have to type the title",
        width: Titanium.UI.FILL,
        height: "150"
    });
    $.__views.eventFormWindow.add($.__views.textArea);
    $.__views.__alloyId4 = Ti.UI.createView({
        backgroundColor: "#ecf0f1",
        width: Titanium.UI.FILL,
        height: Titanium.UI.SIZE,
        layout: "horizontal",
        id: "__alloyId4"
    });
    $.__views.eventFormWindow.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        color: "#2c3e50",
        font: {
            fontSize: 17,
            fontFamily: "Lato-Regular"
        },
        left: 10,
        height: 50,
        width: "70%",
        text: "Private",
        id: "__alloyId5"
    });
    $.__views.__alloyId4.add($.__views.__alloyId5);
    $.__views.switchPrivate = Ti.UI.createSwitch({
        id: "switchPrivate",
        title: "Private",
        value: "0"
    });
    $.__views.__alloyId4.add($.__views.switchPrivate);
    $.__views.__alloyId7 = Ti.UI.createButton({
        title: "Next",
        id: "__alloyId7"
    });
    nextStep ? $.__views.__alloyId7.addEventListener("click", nextStep) : __defers["$.__views.__alloyId7!click!nextStep"] = true;
    $.__views.eventFormWindow.rightNavButton = $.__views.__alloyId7;
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
    $.__views.__alloyId8 = Ti.UI.createView({
        backgroundColor: "#16a085",
        height: 35,
        width: "100%",
        id: "__alloyId8"
    });
    $.__views.eventFormWindowStep2.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        color: "#fff",
        backgroundColor: "#16a085",
        font: {
            fontSize: 17,
            fontFamily: "Lato-Regular"
        },
        left: 10,
        text: "Recent Users",
        id: "__alloyId9"
    });
    $.__views.__alloyId8.add($.__views.__alloyId9);
    $.__views.table_recent = Ti.UI.createTableView({
        barImage: "bgNavBar.png",
        barColor: "#000",
        backgroundColor: "#F3F3F3",
        tabBarHidden: true,
        height: 175,
        id: "table_recent",
        allowsSelectionDuringEditing: "true"
    });
    $.__views.eventFormWindowStep2.add($.__views.table_recent);
    $.__views.search = Ti.UI.createSearchBar({
        barColor: "#16a085",
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
    var data = [], uie = require("UiElements"), indicator = uie.createIndicatorWindow(), drupalServices = require("drupalServices"), clickedRows = [], usersSelected = [], recents = Alloy.Collections.recent;
    $.textArea.addEventListener("focus", function() {
        $.textArea.value = "";
    });
    $.table.addEventListener("click", function(e) {
        var index = _.indexOf(clickedRows, e.row.uid);
        if (e.rowData.selected) {
            e.row.hasCheck = false;
            if (index >= 0) {
                clickedRows.splice(index, 1);
                usersSelected.splice(index, 1);
            }
        } else {
            e.row.hasCheck = true;
            if (0 > index) {
                clickedRows.push(e.row.uid);
                usersSelected.push(e.row);
            }
        }
        e.rowData.selected = !e.rowData.selected;
    });
    $.table_recent.addEventListener("click", function(e) {
        var index = _.indexOf(clickedRows, e.row.uid);
        if (e.rowData.selected) {
            e.row.hasCheck = false;
            if (index >= 0) {
                clickedRows.splice(index, 1);
                usersSelected.splice(index, 1);
            }
        } else {
            e.row.hasCheck = true;
            if (0 > index) {
                clickedRows.push(e.row.uid);
                usersSelected.push(e.row);
            }
        }
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
                    if (_.indexOf(clickedRows, newsItem.uid) >= 0) {
                        newsItem.hasCheck = true;
                        newsItem.selected = !newsItem.selected;
                    }
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
    __defers["$.__views.__alloyId7!click!nextStep"] && $.__views.__alloyId7.addEventListener("click", nextStep);
    __defers["$.__views.createBtn!click!createEvent"] && $.__views.createBtn.addEventListener("click", createEvent);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;