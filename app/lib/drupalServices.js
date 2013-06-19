var REST_PATH = Alloy.CFG.rest;

/*
 *  @desc Retrieve one node
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var nodeRetrieve = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/event/'+opts.nid;

  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("nodeList error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};


/*
 *  @desc Retrieve list of nodes
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var nodeList = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/event.json?type='+opts.type;

  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("nodeList error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};


/*
 *  @desc Create Drupal node
 *  @param {Object} opts Utility payload, should have properties: node property (JSON object), success() and error() callback functions
 *
 */
var createNode = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/node';

  Ti.API.info('creating node, url: '+url);

  xhr.open('POST', url);

  xhr.setRequestHeader('Content-Type','application/json');

  var obj = JSON.stringify(opts.node);
  Ti.API.info('node object: '+ obj);

  xhr.send(obj);

  xhr.onload = function(e) {
    //var nodeObject = JSON.parse(this.responseText);
    Ti.API.info('nodeObject: '+JSON.stringify(e));
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };

  xhr.onerror = function(e) {
    // should do something more robust
    Titanium.API.info('createNode error: '+xhr.statusText);
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};


/*
 *  @desc Close an event.
 *  @param {Object} opts Utility payload, should have properties: node property (JSON object), success() and error() callback functions
 *
 */
var closeNode = function(opts) {
  var xhr = Titanium.Network.createHTTPClient();

  url = REST_PATH + "/event/" + opts.nid + "/close";
  Ti.API.info('closing node, url: '+url);

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send();

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("closeNode error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};


/*
 *  @desc Like an event.
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var likeNode = function(opts) {
  var xhr = Titanium.Network.createHTTPClient();

  url = REST_PATH + "/event/" + opts.nid + "/flag";
  Ti.API.info('liking node, url: '+url);

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type','application/json');

  var obj = JSON.stringify(opts.node);
  Ti.API.info('node object: '+ obj);

  xhr.send(obj);

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("closeNode error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};


/*
 *  @desc Add users to an event.
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var joinNode = function(opts) {
  var xhr = Titanium.Network.createHTTPClient();

  url = REST_PATH + "/event/" + opts.nid + "/join";
  Ti.API.info('joining node, url: '+url);

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type','application/json');

  var obj = JSON.stringify(opts.node);
  Ti.API.info('node object: '+ obj);

  xhr.send(obj);

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("joinNode error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};


/*
 *  @desc Attach file to node
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var attachFile = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/node/' + opts.nid + '/attach_file';

  Ti.API.info('following user, url: '+url);

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', "multipart/form-data");

  var obj = opts.node;
  Ti.API.info('node object: '+ obj);

  xhr.send(obj);

  xhr.onsendstream = function(e){
    var data = { progressValue: e.progress };
    opts.sending && opts.sending(data);
  };

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("userFollow error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};


/*
 *  @desc Retrieve a user
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var userRetrieve = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/duppp_user/'+opts.uid;

  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("userRetrieve error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};


/*
 *  @desc Follow a user
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var followUser = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/duppp_user/'+opts.uid+'/flag';

  Ti.API.info('following user, url: '+url);

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type','application/json');

  var obj = JSON.stringify(opts.node);
  Ti.API.info('node object: '+ obj);

  xhr.send(obj);

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("userFollow error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};


/*
 *  @desc Login
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var userLogin = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/user/login';

  Ti.API.info('login user, url: '+url);

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type','application/json');

  var obj = JSON.stringify(opts.node);
  Ti.API.info('user object: '+ obj);

  xhr.send(obj);

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("userFollow error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};


/*
 *  @desc Connect info.
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var systemInfo = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/system/connect';

  Ti.API.info('System info, url: '+url);

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type','application/json');

  xhr.send();

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("systemInfo error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
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
