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
        console.log("fock");
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
    function openRegisterDuppp() {}
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
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
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
    $.__views.__alloyId28 = Ti.UI.createView({
        layout: "horizontal",
        id: "__alloyId28"
    });
    $.__views.userLogin.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createButton({
        backgroundImage: "none",
        backgroundColor: "#E74C3C",
        height: 106,
        width: "50%",
        title: "Login with Duppp",
        id: "__alloyId29"
    });
    $.__views.__alloyId28.add($.__views.__alloyId29);
    openLoginDuppp ? $.__views.__alloyId29.addEventListener("click", openLoginDuppp) : __defers["$.__views.__alloyId29!click!openLoginDuppp"] = true;
    $.__views.__alloyId30 = Ti.UI.createButton({
        backgroundImage: "none",
        backgroundColor: "#E74C3C",
        height: 106,
        width: "50%",
        title: "Register with Duppp",
        id: "__alloyId30"
    });
    $.__views.__alloyId28.add($.__views.__alloyId30);
    openRegisterDuppp ? $.__views.__alloyId30.addEventListener("click", openRegisterDuppp) : __defers["$.__views.__alloyId30!click!openRegisterDuppp"] = true;
    $.__views.userLoginDuppp = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#3B9DCB",
        backgroundColor: "#F3F3F3",
        borderWidth: 8,
        borderColor: "#888",
        height: 400,
        width: 300,
        borderRadius: 10,
        opacity: .9,
        id: "userLoginDuppp"
    });
    $.__views.userLoginDuppp && $.addTopLevelView($.__views.userLoginDuppp);
    $.__views.loginView = Ti.UI.createScrollView({
        backgroundColor: "#fff",
        contentWidth: "auto",
        contentHeight: "auto",
        top: 0,
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true,
        id: "loginView"
    });
    $.__views.userLoginDuppp.add($.__views.loginView);
    $.__views.__alloyId31 = Ti.UI.createView({
        top: 180,
        layout: "vertical",
        id: "__alloyId31"
    });
    $.__views.loginView.add($.__views.__alloyId31);
    $.__views.loginUsr = Ti.UI.createTextField({
        clearOnEdit: true,
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
    $.__views.__alloyId31.add($.__views.loginUsr);
    $.__views.loginPwd = Ti.UI.createTextField({
        clearOnEdit: true,
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
    $.__views.__alloyId31.add($.__views.loginPwd);
    $.__views.loginBtn = Ti.UI.createButton({
        top: 10,
        font: {
            fontSize: 18
        },
        color: "white",
        height: 40,
        width: 300,
        borderRadius: 5,
        id: "loginBtn",
        title: "Login"
    });
    $.__views.__alloyId31.add($.__views.loginBtn);
    login ? $.__views.loginBtn.addEventListener("click", login) : __defers["$.__views.loginBtn!click!login"] = true;
    $.__views.userRegisterDuppp = Ti.UI.createWindow({
        barImage: "bgNavBar.png",
        barColor: "#3B9DCB",
        backgroundColor: "#F3F3F3",
        borderWidth: 8,
        borderColor: "#888",
        height: 400,
        width: 300,
        borderRadius: 10,
        opacity: .9,
        id: "userRegisterDuppp"
    });
    $.__views.userRegisterDuppp && $.addTopLevelView($.__views.userRegisterDuppp);
    $.__views.registerView = Ti.UI.createScrollView({
        backgroundColor: "#fff",
        contentWidth: "auto",
        contentHeight: "auto",
        top: 0,
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: true,
        id: "registerView",
        visible: "false"
    });
    $.__views.userRegisterDuppp.add($.__views.registerView);
    $.__views.__alloyId32 = Ti.UI.createView({
        top: 180,
        layout: "vertical",
        id: "__alloyId32"
    });
    $.__views.registerView.add($.__views.__alloyId32);
    $.__views.usernameField = Ti.UI.createTextField({
        clearOnEdit: true,
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
    $.__views.__alloyId32.add($.__views.usernameField);
    $.__views.emailField = Ti.UI.createTextField({
        clearOnEdit: true,
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
    $.__views.__alloyId32.add($.__views.emailField);
    $.__views.passwordRegisterField = Ti.UI.createTextField({
        clearOnEdit: true,
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
    $.__views.__alloyId32.add($.__views.passwordRegisterField);
    $.__views.registerBtn = Ti.UI.createButton({
        top: 10,
        font: {
            fontSize: 18
        },
        color: "white",
        height: 40,
        width: 300,
        borderRadius: 5,
        id: "registerBtn",
        title: "Register"
    });
    $.__views.__alloyId32.add($.__views.registerBtn);
    register ? $.__views.registerBtn.addEventListener("click", register) : __defers["$.__views.registerBtn!click!register"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var REST_PATH = Alloy.CFG.rest, urlFB = REST_PATH + "/facebook_connect/connect", drupalServices = require("drupalServices"), fb = require("facebook");
    fb.permissions = [ "publish_stream", "email", "read_friendlists" ];
    fb.appid = "457579484312297";
    fb.forceDialogAuth = true;
    fb.addEventListener("login", facebook);
    __defers["$.__views.__alloyId29!click!openLoginDuppp"] && $.__views.__alloyId29.addEventListener("click", openLoginDuppp);
    __defers["$.__views.__alloyId30!click!openRegisterDuppp"] && $.__views.__alloyId30.addEventListener("click", openRegisterDuppp);
    __defers["$.__views.loginBtn!click!login"] && $.__views.loginBtn.addEventListener("click", login);
    __defers["$.__views.registerBtn!click!register"] && $.__views.registerBtn.addEventListener("click", register);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;