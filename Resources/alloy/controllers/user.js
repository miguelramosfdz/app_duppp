function Controller() {
    function login() {
        var user = {
            username: $.loginUsr.value,
            password: $.loginPwd.value
        };
        var url = REST_PATH + "/user/login";
        var xhr = Titanium.Network.createHTTPClient();
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.open("POST", url);
        xhr.send(user);
        xhr.onload = function() {
            var statusCode = xhr.status;
            if (200 == statusCode) {
                var response = xhr.responseText;
                var data = JSON.parse(response);
                Titanium.App.Properties.setInt("userUid", data.user.uid);
                Titanium.App.Properties.setInt("userSessionId", data.sessid);
                Titanium.App.Properties.setInt("userSessionName", data.sesion_name);
                $.userLoginDuppp.close();
                Titanium.API.fireEvent("user:login");
            } else alert("There was an error");
        };
    }
    function register() {
        console.log("fock");
    }
    function openLoginFacebook() {
        Ti.Facebook.authorize();
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
            var fbuid = Ti.Facebook.getUid();
            var fbAccessToken = Ti.Facebook.getAccessToken();
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
                    $.userLogin.close();
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
    var __alloyId21 = [];
    $.__views.view1 = Ti.UI.createView({
        id: "view1",
        backgroundColor: "#123"
    });
    __alloyId21.push($.__views.view1);
    $.__views.view2 = Ti.UI.createView({
        id: "view2",
        backgroundColor: "#246"
    });
    __alloyId21.push($.__views.view2);
    $.__views.view3 = Ti.UI.createView({
        id: "view3",
        backgroundColor: "#48b"
    });
    __alloyId21.push($.__views.view3);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        views: __alloyId21,
        id: "scrollableView",
        height: "60%"
    });
    $.__views.userLogin.add($.__views.scrollableView);
    $.__views.__alloyId22 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId22"
    });
    $.__views.userLogin.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createButton({
        backgroundImage: "fbBg.png",
        height: 46,
        width: 278,
        top: 10,
        title: "Login with Facebook",
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    openLoginFacebook ? $.__views.__alloyId23.addEventListener("click", openLoginFacebook) : __defers["$.__views.__alloyId23!click!openLoginFacebook"] = true;
    $.__views.__alloyId24 = Ti.UI.createButton({
        backgroundImage: "dBg.png",
        height: 46,
        width: 278,
        top: 10,
        title: "Login with Duppp",
        id: "__alloyId24"
    });
    $.__views.__alloyId22.add($.__views.__alloyId24);
    openLoginDuppp ? $.__views.__alloyId24.addEventListener("click", openLoginDuppp) : __defers["$.__views.__alloyId24!click!openLoginDuppp"] = true;
    $.__views.__alloyId25 = Ti.UI.createButton({
        top: 10,
        font: {
            fontSize: 18
        },
        color: "white",
        height: 40,
        width: 300,
        borderRadius: 5,
        title: "Register with Duppp",
        id: "__alloyId25"
    });
    $.__views.__alloyId22.add($.__views.__alloyId25);
    openRegisterDuppp ? $.__views.__alloyId25.addEventListener("click", openRegisterDuppp) : __defers["$.__views.__alloyId25!click!openRegisterDuppp"] = true;
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
    $.__views.__alloyId26 = Ti.UI.createView({
        top: 180,
        layout: "vertical",
        id: "__alloyId26"
    });
    $.__views.loginView.add($.__views.__alloyId26);
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
    $.__views.__alloyId26.add($.__views.loginUsr);
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
    $.__views.__alloyId26.add($.__views.loginPwd);
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
    $.__views.__alloyId26.add($.__views.loginBtn);
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
    $.__views.__alloyId27 = Ti.UI.createView({
        top: 180,
        layout: "vertical",
        id: "__alloyId27"
    });
    $.__views.registerView.add($.__views.__alloyId27);
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
    $.__views.__alloyId27.add($.__views.usernameField);
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
    $.__views.__alloyId27.add($.__views.emailField);
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
    $.__views.__alloyId27.add($.__views.passwordRegisterField);
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
    $.__views.__alloyId27.add($.__views.registerBtn);
    register ? $.__views.registerBtn.addEventListener("click", register) : __defers["$.__views.registerBtn!click!register"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.include("config.js");
    Ti.include("tiajax.js");
    Titanium.Network.ajax;
    var urlFB = REST_PATH + "/facebook_connect/connect";
    Ti.Facebook.appid = "457579484312297";
    Ti.Facebook.permissions = [ "publish_stream", "email" ];
    Ti.Facebook.addEventListener("login", facebook);
    __defers["$.__views.__alloyId23!click!openLoginFacebook"] && $.__views.__alloyId23.addEventListener("click", openLoginFacebook);
    __defers["$.__views.__alloyId24!click!openLoginDuppp"] && $.__views.__alloyId24.addEventListener("click", openLoginDuppp);
    __defers["$.__views.__alloyId25!click!openRegisterDuppp"] && $.__views.__alloyId25.addEventListener("click", openRegisterDuppp);
    __defers["$.__views.loginBtn!click!login"] && $.__views.loginBtn.addEventListener("click", login);
    __defers["$.__views.registerBtn!click!register"] && $.__views.registerBtn.addEventListener("click", register);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;