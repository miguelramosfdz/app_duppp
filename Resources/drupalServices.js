var REST_PATH = Alloy.CFG.rest;

var nodeRetrieve = function(opts) {
    var xhr = Titanium.Network.createHTTPClient(), url = REST_PATH + "/event/" + opts.nid;
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
        var jsonObject = JSON.parse(this.responseText);
        opts.success && opts.success(jsonObject);
    };
    xhr.onerror = function() {
        console.info("nodeList error: " + JSON.stringify(this));
        opts.error && opts.error({
            status: xhr.status,
            statusText: xhr.statusText
        });
    };
};

var nodeList = function(opts) {
    var xhr = Titanium.Network.createHTTPClient(), url = REST_PATH + "/event.json?type=" + opts.type;
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
        var jsonObject = JSON.parse(this.responseText);
        opts.success && opts.success(jsonObject);
    };
    xhr.onerror = function() {
        console.info("nodeList error: " + JSON.stringify(this));
        opts.error && opts.error({
            status: xhr.status,
            statusText: xhr.statusText
        });
    };
};

var createNode = function(opts) {
    var xhr = Titanium.Network.createHTTPClient(), url = REST_PATH + "/node";
    Ti.API.info("creating node, url: " + url);
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    var obj = JSON.stringify(opts.node);
    Ti.API.info("node object: " + obj);
    xhr.send(obj);
    xhr.onload = function(e) {
        Ti.API.info("nodeObject: " + JSON.stringify(e));
        var jsonObject = JSON.parse(this.responseText);
        opts.success && opts.success(jsonObject);
    };
    xhr.onerror = function() {
        Titanium.API.info("createNode error: " + xhr.statusText);
        opts.error && opts.error({
            status: xhr.status,
            statusText: xhr.statusText
        });
    };
};

var closeNode = function(opts) {
    var xhr = Titanium.Network.createHTTPClient();
    url = REST_PATH + "/event/" + opts.nid + "/close";
    Ti.API.info("closing node, url: " + url);
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = function() {
        var jsonObject = JSON.parse(this.responseText);
        opts.success && opts.success(jsonObject);
    };
    xhr.onerror = function() {
        console.info("closeNode error: " + JSON.stringify(this));
        opts.error && opts.error({
            status: xhr.status,
            statusText: xhr.statusText
        });
    };
};

var likeNode = function(opts) {
    var xhr = Titanium.Network.createHTTPClient();
    url = REST_PATH + "/event/" + opts.nid + "/flag";
    Ti.API.info("liking node, url: " + url);
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    var obj = JSON.stringify(opts.node);
    Ti.API.info("node object: " + obj);
    xhr.send(obj);
    xhr.onload = function() {
        var jsonObject = JSON.parse(this.responseText);
        opts.success && opts.success(jsonObject);
    };
    xhr.onerror = function() {
        console.info("closeNode error: " + JSON.stringify(this));
        opts.error && opts.error({
            status: xhr.status,
            statusText: xhr.statusText
        });
    };
};

var joinNode = function(opts) {
    var xhr = Titanium.Network.createHTTPClient();
    url = REST_PATH + "/event/" + opts.nid + "/join";
    Ti.API.info("joining node, url: " + url);
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    var obj = JSON.stringify(opts.node);
    Ti.API.info("node object: " + obj);
    xhr.send(obj);
    xhr.onload = function() {
        var jsonObject = JSON.parse(this.responseText);
        opts.success && opts.success(jsonObject);
    };
    xhr.onerror = function() {
        console.info("joinNode error: " + JSON.stringify(this));
        opts.error && opts.error({
            status: xhr.status,
            statusText: xhr.statusText
        });
    };
};

var attachFile = function(opts) {
    var xhr = Titanium.Network.createHTTPClient(), url = REST_PATH + "/node/" + opts.nid + "/attach_file";
    Ti.API.info("following user, url: " + url);
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    var obj = opts.node;
    Ti.API.info("node object: " + obj);
    xhr.send(obj);
    xhr.onsendstream = function(e) {
        var data = {
            progressValue: e.progress
        };
        opts.sending && opts.sending(data);
    };
    xhr.onload = function() {
        var jsonObject = JSON.parse(this.responseText);
        opts.success && opts.success(jsonObject);
    };
    xhr.onerror = function() {
        console.info("userFollow error: " + JSON.stringify(this));
        opts.error && opts.error({
            status: xhr.status,
            statusText: xhr.statusText
        });
    };
};

var userRetrieve = function(opts) {
    var xhr = Titanium.Network.createHTTPClient(), url = REST_PATH + "/duppp_user/" + opts.uid;
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
        var jsonObject = JSON.parse(this.responseText);
        opts.success && opts.success(jsonObject);
    };
    xhr.onerror = function() {
        console.info("userRetrieve error: " + JSON.stringify(this));
        opts.error && opts.error({
            status: xhr.status,
            statusText: xhr.statusText
        });
    };
};

var followUser = function(opts) {
    var xhr = Titanium.Network.createHTTPClient(), url = REST_PATH + "/duppp_user/" + opts.uid + "/flag";
    Ti.API.info("following user, url: " + url);
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    var obj = JSON.stringify(opts.node);
    Ti.API.info("node object: " + obj);
    xhr.send(obj);
    xhr.onload = function() {
        var jsonObject = JSON.parse(this.responseText);
        opts.success && opts.success(jsonObject);
    };
    xhr.onerror = function() {
        console.info("userFollow error: " + JSON.stringify(this));
        opts.error && opts.error({
            status: xhr.status,
            statusText: xhr.statusText
        });
    };
};

var userLogin = function(opts) {
    var xhr = Titanium.Network.createHTTPClient(), url = REST_PATH + "/user/login";
    Ti.API.info("login user, url: " + url);
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    var obj = JSON.stringify(opts.node);
    Ti.API.info("user object: " + obj);
    xhr.send(obj);
    xhr.onload = function() {
        var jsonObject = JSON.parse(this.responseText);
        opts.success && opts.success(jsonObject);
    };
    xhr.onerror = function() {
        console.info("userFollow error: " + JSON.stringify(this));
        opts.error && opts.error({
            status: xhr.status,
            statusText: xhr.statusText
        });
    };
};

var systemInfo = function(opts) {
    var xhr = Titanium.Network.createHTTPClient(), url = REST_PATH + "/system/connect";
    Ti.API.info("System info, url: " + url);
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = function() {
        var jsonObject = JSON.parse(this.responseText);
        opts.success && opts.success(jsonObject);
    };
    xhr.onerror = function() {
        console.info("systemInfo error: " + JSON.stringify(this));
        opts.error && opts.error({
            status: xhr.status,
            statusText: xhr.statusText
        });
    };
};

exports.nodeList = nodeList;

exports.userRetrieve = userRetrieve;

exports.nodeRetrieve = nodeRetrieve;

exports.createNode = createNode;

exports.closeNode = closeNode;

exports.attachFile = attachFile;

exports.likeNode = likeNode;

exports.joinNode = joinNode;

exports.followUser = followUser;

exports.userLogin = userLogin;

exports.systemInfo = systemInfo;