function Controller() {
    function login() {
        drupalServices.userLogin({
            node: {
                username: $.loginUsr.value,
                password: $.loginPwd.value
            },
            success: function(data) {
                Titanium.App.Properties.setInt("userUid", data.user.uid);
                Titanium.App.Properties.setInt("userSessionId", data.sessid);
                Titanium.App.Properties.setInt("userSessionName", data.sesion_name);
                $.userLoginDuppp.close();
                Titanium.API.fireEvent("user:login");
            },
            error: function() {
                alert("Error, contact the admin");
            }
        });
    }
    function register() {
        drupalServices.userRegister({
            node: {
                name: $.usernameField.value,
                mail: $.emailField.value,
                pass: $.passwordRegisterField.value,
                status: 1
            },
            success: function() {
                $.userRegisterDuppp.close();
                var t = Titanium.UI.create2DMatrix();
                t = t.scale(0);
                $.userLoginDuppp.transform = t;
                var t1 = Titanium.UI.create2DMatrix();
                t1 = t1.scale(1.1);
                var a = Titanium.UI.createAnimation();
                a.transform = t1;
                a.duration = 200;
                a.addEventListener("complete", function() {
                    var t2 = Titanium.UI.create2DMatrix();
                    t2 = t2.scale(1);
                    $.userLoginDuppp.animate({
                        transform: t2,
                        duration: 200
                    });
                });
                $.userLoginDuppp.open(a);
            },
            error: function(data) {
                alert(data.responseText.form_errors);
            }
        });
    }
    function openLoginDuppp() {
        var t = Titanium.UI.create2DMatrix();
        t = t.scale(0);
        $.userLoginDuppp.transform = t;
        var t1 = Titanium.UI.create2DMatrix();
        t1 = t1.scale(1.1);
        var a = Titanium.UI.createAnimation();
        a.transform = t1;
        a.duration = 200;
        a.addEventListener("complete", function() {
            var t2 = Titanium.UI.create2DMatrix();
            t2 = t2.scale(1);
            $.userLoginDuppp.animate({
                transform: t2,
                duration: 200
            });
        });
        $.userLoginDuppp.open(a);
    }
    function openRegisterDuppp() {
        var t = Titanium.UI.create2DMatrix();
        t = t.scale(0);
        $.userRegisterDuppp.transform = t;
        var t1 = Titanium.UI.create2DMatrix();
        t1 = t1.scale(1.1);
        var a = Titanium.UI.createAnimation();
        a.transform = t1;
        a.duration = 200;
        a.addEventListener("complete", function() {
            var t2 = Titanium.UI.create2DMatrix();
            t2 = t2.scale(1);
            $.userRegisterDuppp.animate({
                transform: t2,
                duration: 200
            });
        });
        $.userRegisterDuppp.open(a);
    }
    function facebook(e) {
        if (e.success) {
            var fbuid = fb.getUid();
            var fbAccessToken = fb.getAccessToken();
            var user = {
                service: "facebook",
                id: fbuid,
                accesstoken: fbAccessToken
            };
            var xhr3 = Titanium.Network.createHTTPClient();
            xhr3.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            xhr3.open("POST", urlFB);
            xhr3.send(user);
            xhr3.onload = function() {
                var statusCode = xhr3.status;
                if (200 == statusCode) {
                    var response = xhr3.responseText;
                    var data = JSON.parse(response);
                    Titanium.App.Properties.setInt("userUid", data.user.uid);
                    Titanium.App.Properties.setInt("userSessionId", data.sessid);
                    Titanium.App.Properties.setInt("userSessionName", data.sesion_name);
                    Titanium.API.fireEvent("user:login");
                } else alert("There was an error");
            };
        } else e.error && alert(e.error);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "user";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.userLogin = Ti.UI.createWindow({
        backgroundColor: "#fff",
        contentWidth: "auto",
        contentHeight: "auto",
        top: 0,
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true,
        id: "userLogin",
        layout: "vertical"
    });
    $.__views.userLogin && $.addTopLevelView($.__views.userLogin);
    $.__views.__alloyId39 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId39"
    });
    $.__views.userLogin.add($.__views.__alloyId39);
    $.__views.headImage = Ti.UI.createImageView({
        id: "headImage",
        image: "bg.jpg"
    });
    $.__views.__alloyId39.add($.__views.headImage);
    $.__views.__alloyId40 = Ti.UI.createButton({
        backgroundImage: "none",
        backgroundColor: "#27ae60",
        font: {
            fontSize: 24,
            fontFamily: "Lato-Light"
        },
        height: 106,
        bottom: 0,
        width: "50%",
        title: "Login",
        id: "__alloyId40"
    });
    $.__views.__alloyId39.add($.__views.__alloyId40);
    openLoginDuppp ? $.__views.__alloyId40.addEventListener("click", openLoginDuppp) : __defers["$.__views.__alloyId40!click!openLoginDuppp"] = true;
    $.__views.__alloyId41 = Ti.UI.createButton({
        backgroundImage: "none",
        backgroundColor: "#c0392b",
        height: 106,
        bottom: 0,
        font: {
            fontSize: 24,
            fontFamily: "Lato-Light"
        },
        width: "50%",
        title: "Register",
        id: "__alloyId41"
    });
    $.__views.__alloyId39.add($.__views.__alloyId41);
    openRegisterDuppp ? $.__views.__alloyId41.addEventListener("click", openRegisterDuppp) : __defers["$.__views.__alloyId41!click!openRegisterDuppp"] = true;
    $.__views.userLoginDuppp = Ti.UI.createWindow({
        backgroundColor: "#edeff1",
        height: 200,
        borderRadius: 5,
        width: 300,
        id: "userLoginDuppp",
        layout: "vertical"
    });
    $.__views.userLoginDuppp && $.addTopLevelView($.__views.userLoginDuppp);
    $.__views.__alloyId42 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId42"
    });
    $.__views.userLoginDuppp.add($.__views.__alloyId42);
    $.__views.loginUsr = Ti.UI.createTextField({
        clearOnEdit: true,
        height: 40,
        color: "#34495e",
        backgroundColor: "#fff",
        top: 20,
        width: 250,
        paddingLeft: 10,
        font: {
            fontSize: 14,
            fontFamily: "Lato-Regular"
        },
        borderRadius: 5,
        borderWidth: 0,
        id: "loginUsr",
        value: "Username",
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
    });
    $.__views.__alloyId42.add($.__views.loginUsr);
    $.__views.loginPwd = Ti.UI.createTextField({
        clearOnEdit: true,
        height: 40,
        color: "#34495e",
        backgroundColor: "#fff",
        top: 20,
        width: 250,
        paddingLeft: 10,
        font: {
            fontSize: 14,
            fontFamily: "Lato-Regular"
        },
        borderRadius: 5,
        borderWidth: 0,
        id: "loginPwd",
        passwordMask: "true",
        value: "Password",
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
    });
    $.__views.__alloyId42.add($.__views.loginPwd);
    $.__views.loginBtn = Ti.UI.createButton({
        top: 20,
        font: {
            fontSize: 18,
            fontFamily: "Lato-Regular"
        },
        backgroundImage: "none",
        backgroundColor: "#2ecc71",
        color: "white",
        height: 40,
        width: 250,
        borderRadius: 5,
        id: "loginBtn",
        title: "Login"
    });
    $.__views.__alloyId42.add($.__views.loginBtn);
    login ? $.__views.loginBtn.addEventListener("click", login) : __defers["$.__views.loginBtn!click!login"] = true;
    $.__views.userRegisterDuppp = Ti.UI.createWindow({
        backgroundColor: "#edeff1",
        height: 260,
        borderRadius: 5,
        width: 300,
        id: "userRegisterDuppp"
    });
    $.__views.userRegisterDuppp && $.addTopLevelView($.__views.userRegisterDuppp);
    $.__views.__alloyId43 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId43"
    });
    $.__views.userRegisterDuppp.add($.__views.__alloyId43);
    $.__views.usernameField = Ti.UI.createTextField({
        clearOnEdit: true,
        height: 40,
        color: "#34495e",
        backgroundColor: "#fff",
        top: 20,
        width: 250,
        paddingLeft: 10,
        font: {
            fontSize: 14,
            fontFamily: "Lato-Regular"
        },
        borderRadius: 5,
        borderWidth: 0,
        id: "usernameField",
        value: "Username",
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
    });
    $.__views.__alloyId43.add($.__views.usernameField);
    $.__views.emailField = Ti.UI.createTextField({
        clearOnEdit: true,
        height: 40,
        color: "#34495e",
        backgroundColor: "#fff",
        top: 20,
        width: 250,
        paddingLeft: 10,
        font: {
            fontSize: 14,
            fontFamily: "Lato-Regular"
        },
        borderRadius: 5,
        borderWidth: 0,
        id: "emailField",
        value: "Email",
        keyboardType: Titanium.UI.KEYBOARD_EMAIL,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
    });
    $.__views.__alloyId43.add($.__views.emailField);
    $.__views.passwordRegisterField = Ti.UI.createTextField({
        clearOnEdit: true,
        height: 40,
        color: "#34495e",
        backgroundColor: "#fff",
        top: 20,
        width: 250,
        paddingLeft: 10,
        font: {
            fontSize: 14,
            fontFamily: "Lato-Regular"
        },
        borderRadius: 5,
        borderWidth: 0,
        id: "passwordRegisterField",
        passwordMask: "true",
        value: "Password",
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE
    });
    $.__views.__alloyId43.add($.__views.passwordRegisterField);
    $.__views.registerBtn = Ti.UI.createButton({
        top: 20,
        font: {
            fontSize: 18,
            fontFamily: "Lato-Regular"
        },
        backgroundImage: "none",
        backgroundColor: "#2ecc71",
        color: "white",
        height: 40,
        width: 250,
        borderRadius: 5,
        id: "registerBtn",
        title: "Register"
    });
    $.__views.__alloyId43.add($.__views.registerBtn);
    register ? $.__views.registerBtn.addEventListener("click", register) : __defers["$.__views.registerBtn!click!register"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var REST_PATH = Alloy.CFG.rest, urlFB = REST_PATH + "/facebook_connect/connect", drupalServices = require("drupalServices"), fb = require("facebook");
    fb.permissions = [ "publish_stream", "email", "read_friendlists" ];
    fb.appid = "457579484312297";
    fb.forceDialogAuth = true;
    fb.addEventListener("login", facebook);
    __defers["$.__views.__alloyId40!click!openLoginDuppp"] && $.__views.__alloyId40.addEventListener("click", openLoginDuppp);
    __defers["$.__views.__alloyId41!click!openRegisterDuppp"] && $.__views.__alloyId41.addEventListener("click", openRegisterDuppp);
    __defers["$.__views.loginBtn!click!login"] && $.__views.loginBtn.addEventListener("click", login);
    __defers["$.__views.registerBtn!click!register"] && $.__views.registerBtn.addEventListener("click", register);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;