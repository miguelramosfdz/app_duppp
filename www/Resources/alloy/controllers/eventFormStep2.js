function Controller() {
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
    function storeUsers(e) {
        "use strict";
        var row = e.row;
        var index = _.indexOf(clickedRows, row.uid);
        if (row.hasCheck) {
            row.setHasCheck(false);
            if (index >= 0) {
                clickedRows.splice(index, 1);
                usersSelected.splice(index, 1);
            }
        } else {
            row.setHasCheck(true);
            if (0 > index) {
                clickedRows.push(e.row.uid);
                usersSelected.push(e.row);
            }
        }
    }
    function prepareData(json) {
        var data = [];
        json.forEach(function(user) {
            if (parseInt(user.uid) !== Ti.App.Properties.getInt("userUid")) {
                user.isNoReturn = true;
                var newsItem = Alloy.createController("userRow", user).getView();
                if (_.indexOf(clickedRows, newsItem.uid) >= 0) {
                    newsItem.hasCheck = true;
                    newsItem.selected = !newsItem.selected;
                }
                data.push(newsItem);
            }
        });
        return data;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "eventFormStep2";
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
        image: "duppp.png",
        __parentSymbol: $.__views.Wrapper
    });
    $.__views.NavigationBar.setParent($.__views.Wrapper);
    $.__views.search = Ti.UI.createSearchBar({
        barColor: "#16a085",
        id: "search",
        hintText: "Search a user"
    });
    $.__views.Wrapper.add($.__views.search);
    $.__views.table = Ti.UI.createTableView({
        id: "table"
    });
    $.__views.Wrapper.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("core");
    var CONFIG = arguments[0] || {};
    var clickedRows = [], usersSelected = [], recents = APP.recent, drupalServices = require("drupalServices");
    $.init = function() {
        APP.log("debug", "eventForm.init | " + JSON.stringify(CONFIG));
        recents.fetch();
        var users = recents.toJSON(), data = prepareData(users);
        data.reverse();
        $.table.setData(data);
        $.NavigationBar.setBackgroundColor(APP.Settings.colors.primary || "#000");
        true === CONFIG.isChild && $.NavigationBar.showBack();
        if (APP.Settings.useSlideMenu) {
            $.NavigationBar.showBack();
            $.NavigationBar.showDone({
                callback: function() {
                    $.createEvent();
                }
            });
        } else $.NavigationBar.showSettings();
    };
    var last_search = null;
    $.search.addEventListener("return", function(e) {
        if (e.value != last_search) {
            last_search = e.value;
            APP.openLoading();
            drupalServices.searchUser(e.value, function(users) {
                var data = prepareData(JSON.parse(users));
                $.table.setData(data);
                APP.closeLoading();
            });
            $.search.blur();
        }
    });
    $.table.addEventListener("click", storeUsers);
    $.createEvent = function() {
        if (Ti.App.Properties.getInt("userUid")) {
            APP.openLoading();
            drupalServices.createNode({
                type: CONFIG.type,
                title: CONFIG.title,
                language: CONFIG.language,
                group_access: {
                    und: CONFIG.group_access.und
                },
                field_event_date: {
                    und: [ {
                        show_todate: CONFIG.field_event_date.und[0].show_todate,
                        value: {
                            month: CONFIG.field_event_date.und[0].value.month,
                            day: CONFIG.field_event_date.und[0].value.day,
                            year: CONFIG.field_event_date.und[0].value.year,
                            hour: CONFIG.field_event_date.und[0].value.hour,
                            minute: CONFIG.field_event_date.und[0].value.minute
                        }
                    } ]
                },
                uid: CONFIG.uid,
                status: CONFIG.status
            }, function(data) {
                APP.closeLoading();
                APP.closeMenuRight();
                APP.removeChild();
                Ti.API.fireEvent("eventCreated");
                var join = {
                    uid: clickedRows
                };
                recentUsers(usersSelected);
                drupalServices.joinNode(join, data.nid);
            }, function() {
                alert("There was an error, try again.");
            });
        } else alert("You need to login first");
    };
    $.init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;