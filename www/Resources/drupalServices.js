var REST_PATH = Alloy.CFG.rest, BASE_PATH = Alloy.CFG.base;

var nodeRetrieveComments = function(nid, success, failure, headers) {
    Ti.API.info("Retrieve comments: " + nid + " with cookie " + Ti.App.Properties.getString("Drupal-Cookie"));
    makeAuthenticatedRequest({
        httpMethod: "GET",
        servicePath: "/events/" + nid + "/comments",
        contentType: "application/json"
    }, function(responseData) {
        Ti.API.info("nodeRetrieveComments SUCCESS");
        success && success(responseData);
    }, function(err) {
        Ti.API.error("nodeRetrieveComments FAIL");
        failure && failure(err);
    }, headers);
};

var createComment = function(object, success, failure, headers) {
    makeAuthenticatedRequest({
        httpMethod: "POST",
        servicePath: "/comment",
        contentType: "application/json",
        params: JSON.stringify(object)
    }, function(responseData) {
        Ti.API.info("createComment SUCCESS");
        success && success(responseData);
    }, function(err) {
        Ti.API.error("createComment FAIL");
        failure && failure(err);
    }, headers);
};

var nodeList = function(type, title, success, failure, headers) {
    Ti.API.info("Node list with cookie " + Ti.App.Properties.getString("Drupal-Cookie"));
    title || (title = "");
    type || (type = "");
    makeAuthenticatedRequest({
        httpMethod: "GET",
        servicePath: "/events?type=" + type + "&title=" + title,
        contentType: "application/json"
    }, function(responseData) {
        Ti.API.info("nodeList SUCCESS");
        success && success(responseData);
    }, function(err) {
        Ti.API.error("nodeList FAIL");
        failure && failure(err);
    }, headers);
};

var userNodesList = function(uid, success, failure, headers) {
    Ti.API.info("Node list with cookie " + Ti.App.Properties.getString("Drupal-Cookie"));
    makeAuthenticatedRequest({
        httpMethod: "GET",
        servicePath: "/duppp_user/" + uid + "/events",
        contentType: "application/json"
    }, function(responseData) {
        Ti.API.info("userNodesList SUCCESS");
        success && success(responseData);
    }, function(err) {
        Ti.API.error("userNodesList FAIL");
        failure && failure(err);
    }, headers);
};

var createNode = function(object, success, failure, headers) {
    makeAuthenticatedRequest({
        httpMethod: "POST",
        servicePath: "/events",
        contentType: "application/json",
        params: JSON.stringify({
            node: object
        })
    }, function(responseData) {
        Ti.API.info("createNode SUCCESS");
        success && success(responseData);
    }, function(err) {
        Ti.API.error("createNode FAIL");
        failure && failure(err);
    }, headers);
};

var createNodeContribution = function(object, success, failure, headers) {
    makeAuthenticatedRequest({
        httpMethod: "POST",
        servicePath: "/node",
        contentType: "application/json",
        params: JSON.stringify({
            node: object
        })
    }, function(responseData) {
        Ti.API.info("createNodeContribution SUCCESS");
        success && success(responseData);
    }, function(err) {
        Ti.API.error("createNodeContribution FAIL");
        failure && failure(err);
    }, headers);
};

var closeNode = function(nid, success, failure, headers) {
    makeAuthenticatedRequest({
        httpMethod: "POST",
        servicePath: "/events/" + nid + "/close",
        contentType: "application/json"
    }, function(responseData) {
        Ti.API.info("closeNode SUCCESS");
        success && success(responseData);
    }, function(err) {
        Ti.API.error("closeNode FAIL");
        failure && failure(err);
    }, headers);
};

var likeNode = function(object, nid, success, failure, headers) {
    makeAuthenticatedRequest({
        httpMethod: "POST",
        servicePath: "/events/" + nid + "/flag",
        contentType: "application/json",
        params: object
    }, function(responseData) {
        Ti.API.info("likeNode SUCCESS");
        success && success(responseData);
    }, function(err) {
        Ti.API.error("likeNode FAIL");
        failure && failure(err);
    }, headers);
};

var joinNode = function(object, nid, success, failure, headers) {
    makeAuthenticatedRequest({
        httpMethod: "POST",
        servicePath: "/events/" + nid + "/join",
        contentType: "application/json",
        params: JSON.stringify(object)
    }, function(responseData) {
        Ti.API.info("joinNode SUCCESS");
        success && success(responseData);
    }, function(err) {
        Ti.API.error("joinNode FAIL");
        failure && failure(err);
    }, headers);
};

var attachFile = function(object, nid, success, failure, headers, sending) {
    makeAuthenticatedRequest({
        servicePath: "/node/" + nid + "/attach_file",
        httpMethod: "POST",
        contentType: "multipart/form-data",
        params: object
    }, function(responseData) {
        Ti.API.info("attachFile SUCCESS");
        success && success(responseData);
    }, function(err) {
        Ti.API.error("attachFile FAIL");
        failure && failure(err);
    }, headers, function(e) {
        var data = {
            progressValue: e.progress
        };
        Ti.API.info(data);
        sending && sending(data);
    });
};

var userRetrieve = function(uid, success, failure, headers) {
    Ti.API.info("Retrieve user: " + uid + " with cookie " + Ti.App.Properties.getString("Drupal-Cookie"));
    makeAuthenticatedRequest({
        httpMethod: "GET",
        servicePath: "/duppp_user/" + uid,
        contentType: "application/json"
    }, function(responseData) {
        Ti.API.info("userRetrieve SUCCESS");
        success && success(responseData);
    }, function(err) {
        Ti.API.error("userRetrieve FAIL");
        failure && failure(err);
    }, headers);
};

var followUser = function(object, uid, success, failure, headers) {
    makeAuthenticatedRequest({
        servicePath: "/duppp_user/" + uid + "/flag",
        httpMethod: "POST",
        params: object
    }, function(responseData) {
        Ti.API.info("followUser SUCCESS");
        success && success(responseData);
    }, function(err) {
        Ti.API.error("followUser FAIL");
        failure && failure(err);
    }, headers);
};

var userLogin = function(username, password, success, failure, headers) {
    var user = {
        username: username,
        password: password
    };
    makeAuthenticatedRequest({
        httpMethod: "POST",
        servicePath: "/user/login",
        contentType: "application/json",
        params: JSON.stringify(user)
    }, function(responseData) {
        var cookie = responseData.session_name + "=" + responseData.sessid;
        Ti.App.Properties.setString("Drupal-Cookie", cookie);
        Ti.API.debug("login saving new cookie " + cookie);
        Ti.App.Properties.setInt("userUid", responseData.user.uid);
        Ti.App.Properties.setInt("userSessionId", responseData.sessid);
        Ti.App.Properties.setInt("userSessionName", responseData.sesion_name);
        Ti.App.Properties.setString("X-CSRF-Token", null);
        getCsrfToken(function() {
            success && success(responseData.user);
        }, function(err) {
            failure && failure(err);
        });
    }, failure, headers);
};

var userRegister = function(user, success, failure, headers) {
    Ti.API.info("Registering new user: " + JSON.stringify(user) + " with cookie " + Ti.App.Properties.getString("Drupal-Cookie"));
    makeAuthenticatedRequest({
        httpMethod: "POST",
        servicePath: "/user/register",
        contentType: "application/json",
        params: JSON.stringify(user)
    }, function(responseData) {
        Ti.API.info("userRegister SUCCESS");
        success && success(responseData);
    }, function(err) {
        Ti.API.error("userRegister FAIL");
        failure && failure(err);
    }, headers);
};

var searchUser = function(search, success, failure, headers) {
    Ti.API.info("Node list with cookie " + Ti.App.Properties.getString("Drupal-Cookie"));
    makeAuthenticatedRequest({
        httpMethod: "GET",
        servicePath: "/duppp_user.json?username=" + search,
        contentType: "application/json"
    }, function(responseData) {
        Ti.API.info("searchUser SUCCESS");
        success && success(responseData);
    }, function(err) {
        Ti.API.error("searchUser FAIL");
        failure && failure(err);
    }, headers);
};

var systemInfo = function(success, failure) {
    var xhr = Ti.Network.createHTTPClient();
    var url = REST_PATH + "/system/connect";
    Ti.API.debug("POSTing to url " + url);
    xhr.open("POST", url);
    xhr.onload = function() {
        if (200 == xhr.status) {
            var response = xhr.responseText;
            var responseData = JSON.parse(response);
            Ti.API.debug("system.connect session " + responseData.sessid);
            Ti.API.debug("system.connect user " + responseData.user.uid);
            console.log(responseData);
            var cookie = responseData.session_name + "=" + responseData.sessid;
            Ti.App.Properties.setString("Drupal-Cookie", cookie);
            getCsrfToken(function() {
                success && success(responseData);
            }, function(err) {
                failure && failure(err);
            });
        } else failure && failure(xhr.responseText);
    };
    xhr.onerror = function(e) {
        Ti.API.error("There was an error calling systemConnect: ");
        Ti.API.error(e);
        Ti.App.Properties.setString("X-CSRF-Token", null);
        Ti.App.Properties.setString("Drupal-Cookie", null);
        failure && failure(e);
    };
    xhr.clearCookies(BASE_PATH);
    xhr.send();
};

var getCsrfToken = function(success, failure) {
    var existingToken = Ti.App.Properties.getString("X-CSRF-Token");
    if (existingToken) {
        success(existingToken);
        return;
    }
    var xhr = Ti.Network.createHTTPClient();
    xhr.onload = function() {
        Ti.App.Properties.setString("X-CSRF-Token", xhr.responseText);
        Ti.API.info("got new CSRF token " + xhr.responseText);
        success(xhr.responseText);
    };
    xhr.onerror = function(err) {
        Ti.API.error("error getting CSRF token:");
        Ti.API.error(err);
        failure(err);
    };
    var tokenPath = BASE_PATH + "/services/session/token";
    xhr.open("GET", tokenPath);
    var cookie = Ti.App.Properties.getString("Drupal-Cookie");
    xhr.setRequestHeader("Cookie", cookie);
    xhr.send();
};

var makeAuthenticatedRequest = function(config, success, failure, headers, sending) {
    var trace = "makeAuthenticatedRequest()\n";
    var url = REST_PATH + config.servicePath;
    var xhr = Titanium.Network.createHTTPClient();
    trace += config.httpMethod + " " + url + "\n";
    config.timeout && (xhr.timeout = config.timeout);
    xhr.onsendstream = function(e) {
        sending && sending(e);
    };
    xhr.open(config.httpMethod, url);
    xhr.onerror = function(e) {
        Ti.API.error(JSON.stringify(e));
        Ti.API.error("FAILED REQUEST:");
        Ti.API.error(trace);
        Ti.API.error(config.params);
        failure(e);
    };
    xhr.onload = function() {
        if (200 == xhr.status) {
            var responseData = JSON.parse(xhr.responseText);
            success(responseData);
        } else {
            Ti.API.trace("makeAuthReq returned with status " + xhr.status);
            failure(xhr.responseText);
        }
    };
    if (!config.skipCookie) {
        var cookie = Ti.App.Properties.getString("Drupal-Cookie");
        xhr.setRequestHeader("Cookie", cookie);
        trace += "Cookie: " + cookie + "\n";
    }
    if (!config.skipCsrfToken) {
        var token = Ti.App.Properties.getString("X-CSRF-Token");
        xhr.setRequestHeader("X-CSRF-Token", token);
        trace += "X-CSRF-Token: " + token + "\n";
    }
    xhr.setRequestHeader("Accept", "application/json");
    if (config.contentType) {
        xhr.setRequestHeader("Content-Type", config.contentType);
        trace += "Content-Type: " + config.contentType + "\n";
    }
    if (headers) for (var key in headers) xhr.setRequestHeader(key, headers[key]);
    if (config.trace) {
        Ti.API.trace(trace);
        Ti.API.trace(config.params);
    }
    xhr.send(config.params);
};

exports.nodeList = nodeList;

exports.userNodesList = userNodesList;

exports.userRetrieve = userRetrieve;

exports.createNode = createNode;

exports.createNodeContribution = createNodeContribution;

exports.closeNode = closeNode;

exports.attachFile = attachFile;

exports.likeNode = likeNode;

exports.joinNode = joinNode;

exports.followUser = followUser;

exports.userLogin = userLogin;

exports.userRegister = userRegister;

exports.systemInfo = systemInfo;

exports.getToken = getCsrfToken;

exports.searchUser = searchUser;

exports.nodeRetrieveComments = nodeRetrieveComments;

exports.createComment = createComment;