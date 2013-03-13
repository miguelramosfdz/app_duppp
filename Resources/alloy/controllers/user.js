function Controller() {
    function login(e) {
        var user = {
            username: $.loginUsr.value,
            password: $.loginPwd.value
        }, url = REST_PATH + "/user/user/login", xhr = Titanium.Network.createHTTPClient();
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.open("POST", url);
        xhr.send(user);
        xhr.onload = function() {
            var statusCode = xhr.status;
            if (statusCode == 200) {
                var response = xhr.responseText, data = JSON.parse(response);
                Titanium.App.Properties.setInt("userUid", data.user.uid);
                Titanium.App.Properties.setInt("userSessionId", data.sessid);
                Titanium.App.Properties.setInt("userSessionName", data.sesion_name);
                var xhr2 = Titanium.Network.createHTTPClient(), getUser = REST_PATH + "/user/user/" + data.user.uid + ".json";
                xhr2.open("GET", getUser);
                xhr2.send();
                xhr2.onload = function() {
                    var userStatusCode = xhr2.status;
                    if (userStatusCode == 200) {
                        var userResponse = xhr2.responseText, user = JSON.parse(userResponse);
                        Titanium.App.Properties.setString("userName", user.name);
                        $.userLogin.close();
                    }
                };
            } else alert("There was an error");
        };
    }
    function switchViews() {
        if ($.switchBtn.title === "Login") {
            $.registerView.hide();
            $.loginView.show();
            $.switchBtn.title = "Get Duppp account";
        } else {
            $.loginView.hide();
            $.registerView.show();
            $.switchBtn.title = "Login";
        }
    }
    function register() {
        console.log("fock");
    }
    function close() {
        $.userLogin.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.userLogin = Ti.UI.createWindow({
        id: "userLogin"
    });
    $.addTopLevelView($.__views.userLogin);
    $.__views.loginView = Ti.UI.createScrollView({
        backgroundImage: "bg.png",
        contentWidth: "auto",
        contentHeight: "auto",
        top: 0,
        showVerticalScrollIndicator: !0,
        showHorizontalScrollIndicator: !0,
        id: "loginView"
    });
    $.__views.userLogin.add($.__views.loginView);
    $.__views.__alloyId20 = Ti.UI.createView({
        top: 180,
        layout: "vertical",
        id: "__alloyId20"
    });
    $.__views.loginView.add($.__views.__alloyId20);
    $.__views.loginUsr = Ti.UI.createTextField({
        clearOnEdit: !0,
        height: 40,
        backgroundColor: "#fff",
        top: 10,
        left: 10,
        width: 300,
        paddingLeft: 10,
        font: {
            fontSize: 14
        },
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 5,
        id: "loginUsr",
        value: "Username",
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
    });
    $.__views.__alloyId20.add($.__views.loginUsr);
    $.__views.loginPwd = Ti.UI.createTextField({
        clearOnEdit: !0,
        height: 40,
        backgroundColor: "#fff",
        top: 10,
        left: 10,
        width: 300,
        paddingLeft: 10,
        font: {
            fontSize: 14
        },
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 5,
        id: "loginPwd",
        passwordMask: "true",
        value: "Password",
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
    });
    $.__views.__alloyId20.add($.__views.loginPwd);
    $.__views.loginBtn = Ti.UI.createButton({
        top: 10,
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
                color: "#6a7179",
                offset: 0
            }, {
                color: "#2d3032",
                offset: 1
            } ]
        },
        backgroundImage: "none",
        backgroundFocusedColor: "#2d3032",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        color: "white",
        height: 40,
        width: 300,
        borderRadius: 5,
        id: "loginBtn",
        title: "Login"
    });
    $.__views.__alloyId20.add($.__views.loginBtn);
    login ? $.__views.loginBtn.addEventListener("click", login) : __defers["$.__views.loginBtn!click!login"] = !0;
    $.__views.registerView = Ti.UI.createScrollView({
        backgroundImage: "bg.png",
        contentWidth: "auto",
        contentHeight: "auto",
        top: 0,
        showVerticalScrollIndicator: !0,
        showHorizontalScrollIndicator: !0,
        id: "registerView",
        visible: "false"
    });
    $.__views.userLogin.add($.__views.registerView);
    $.__views.__alloyId21 = Ti.UI.createView({
        top: 180,
        layout: "vertical",
        id: "__alloyId21"
    });
    $.__views.registerView.add($.__views.__alloyId21);
    $.__views.usernameField = Ti.UI.createTextField({
        clearOnEdit: !0,
        height: 40,
        backgroundColor: "#fff",
        top: 10,
        left: 10,
        width: 300,
        paddingLeft: 10,
        font: {
            fontSize: 14
        },
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 5,
        id: "usernameField",
        value: "Username",
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
    });
    $.__views.__alloyId21.add($.__views.usernameField);
    $.__views.emailField = Ti.UI.createTextField({
        clearOnEdit: !0,
        height: 40,
        backgroundColor: "#fff",
        top: 10,
        left: 10,
        width: 300,
        paddingLeft: 10,
        font: {
            fontSize: 14
        },
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 5,
        id: "emailField",
        value: "Email",
        keyboardType: Titanium.UI.KEYBOARD_EMAIL,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
    });
    $.__views.__alloyId21.add($.__views.emailField);
    $.__views.passwordRegisterField = Ti.UI.createTextField({
        clearOnEdit: !0,
        height: 40,
        backgroundColor: "#fff",
        top: 10,
        left: 10,
        width: 300,
        paddingLeft: 10,
        font: {
            fontSize: 14
        },
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 5,
        id: "passwordRegisterField",
        passwordMask: "true",
        value: "Password",
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
    });
    $.__views.__alloyId21.add($.__views.passwordRegisterField);
    $.__views.registerBtn = Ti.UI.createButton({
        top: 10,
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
                color: "#6a7179",
                offset: 0
            }, {
                color: "#2d3032",
                offset: 1
            } ]
        },
        backgroundImage: "none",
        backgroundFocusedColor: "#2d3032",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        color: "white",
        height: 40,
        width: 300,
        borderRadius: 5,
        id: "registerBtn",
        title: "Register"
    });
    $.__views.__alloyId21.add($.__views.registerBtn);
    register ? $.__views.registerBtn.addEventListener("click", register) : __defers["$.__views.registerBtn!click!register"] = !0;
    $.__views.switchBtn = Ti.UI.createButton({
        bottom: 10,
        width: 140,
        height: 25,
        font: {
            fontSize: 13
        },
        color: "white",
        backgroundImage: "none",
        backgroundColor: "#b7544b",
        borderRadius: 13,
        id: "switchBtn",
        title: "Get Duppp Account"
    });
    $.__views.userLogin.add($.__views.switchBtn);
    switchViews ? $.__views.switchBtn.addEventListener("click", switchViews) : __defers["$.__views.switchBtn!click!switchViews"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    $.loginBtn.addEventListener("touchstart", function() {
        $.loginBtn.backgroundGradient = {
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
                color: "#2d3032",
                offset: 0
            }, {
                color: "#2d3032",
                offset: 1
            } ]
        };
    });
    $.loginBtn.addEventListener("touchend", function() {
        $.loginBtn.backgroundGradient = {
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
                color: "#6a7179",
                offset: 0
            }, {
                color: "#2d3032",
                offset: 1
            } ]
        };
    });
    __defers["$.__views.loginBtn!click!login"] && $.__views.loginBtn.addEventListener("click", login);
    __defers["$.__views.registerBtn!click!register"] && $.__views.registerBtn.addEventListener("click", register);
    __defers["$.__views.switchBtn!click!switchViews"] && $.__views.switchBtn.addEventListener("click", switchViews);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;