var REST_PATH = Alloy.CFG.rest,
  BASE_PATH = Alloy.CFG.base;

/*
 *  @desc Retrieve one node
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var nodeRetrieve = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/events/'+opts.nid;

  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("nodeRetrieve error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};

/*
 *  @desc Retrieve comments of node
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var nodeRetrieveComments = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/events/'+opts.nid+'/comments';

  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("nodeRetrieve error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};

/*
 *  @desc Retrieve comments of node
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var createComment = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/comment',
    token = Ti.App.Properties.getString("token");

  Ti.API.info('creating comment, url: '+url);

  xhr.open('POST', url);

  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('X-CSRF-Token', token);

  var obj = JSON.stringify(opts.node);
  Ti.API.info('comment object: '+ obj);

  xhr.send(obj);

  xhr.onload = function(e) {
    //var nodeObject = JSON.parse(this.responseText);
    Ti.API.info('commentObject: '+JSON.stringify(e));
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };

  xhr.onerror = function(e) {
    // should do something more robust
    Titanium.API.info('createComment error: '+xhr.statusText);
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
    url = REST_PATH + '/events?type='+opts.type+'&title='+opts.title;

  xhr.open('GET', url);
  xhr.send();

  Ti.API.info('nodeList info, url: '+url);

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
 *  @desc Retrieve list of nodes of one user
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var userNodesList = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/duppp_user/'+opts.uid+'/events';

  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("userNodesList error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};

/**
 * Create Drupal node
 * @param  {Object} opts Utility payload, should have properties: node property (JSON object), success() and error() callback functions
 * @return {Object}      Return object with callback.
 */
var createNode = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/events',
    token = Ti.App.Properties.getString("token");

  Ti.API.info('creating node, url: '+url);

  xhr.open('POST', url);

  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('X-CSRF-Token', token);

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

/**
 * Create Drupal node
 * @param  {Object} opts Utility payload, should have properties: node property (JSON object), success() and error() callback functions
 * @return {Object}      Return object with callback.
 */
var createNodeContribution = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/node',
    token = Ti.App.Properties.getString("token");

  Ti.API.info('creating node, url: '+url);

  xhr.open('POST', url);

  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('X-CSRF-Token', token);

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
    Titanium.API.info('createNodeContribution error: '+xhr.statusText);
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
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + "/events/" + opts.nid + "/close",
    token = Ti.App.Properties.getString("token");

  Ti.API.info('closing node, url: '+url);

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('X-CSRF-Token', token);
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
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + "/events/" + opts.nid + "/flag",
    token = Ti.App.Properties.getString("token");

  Ti.API.info('liking node, url: '+url);

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('X-CSRF-Token', token);

  var obj = JSON.stringify(opts.node);
  Ti.API.info('node object: '+ obj);

  xhr.send(obj);

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("likeNode error: "+JSON.stringify(this));
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
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + "/events/" + opts.nid + "/join",
    token = Ti.App.Properties.getString("token");

  Ti.API.info('joining node, url: '+url);

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('X-CSRF-Token', token);

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
    url = REST_PATH + '/node/' + opts.nid + '/attach_file',
    token = Ti.App.Properties.getString("token");

  Ti.API.info('Attach file, url: '+url);

  xhr.onsendstream = function(e){
    var data = { progressValue: e.progress };
    opts.sending && opts.sending(data);
  };

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', "multipart/form-data");
  xhr.setRequestHeader('X-CSRF-Token', token);

  var obj = opts.node;
  Ti.API.info('node object: '+ obj);

  xhr.send(obj);

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("attachFile error: "+JSON.stringify(this));
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
    url = REST_PATH + '/duppp_user/' + opts.uid;

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
    url = REST_PATH + '/duppp_user/'+opts.uid+'/flag',
    token = Ti.App.Properties.getString("token");

  Ti.API.info('following user, url: '+url);

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('X-CSRF-Token', token);

  var obj = JSON.stringify(opts.node);
  Ti.API.info('node object: '+ obj);

  xhr.send(obj);

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("followUser error: "+JSON.stringify(this));
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
    url = REST_PATH + '/user/login',
    token = Ti.App.Properties.getString("token");

  Ti.API.info('login user, url: '+url);

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('X-CSRF-Token', token);

  var obj = JSON.stringify(opts.node);
  Ti.API.info('user object: '+ obj);

  xhr.send(obj);

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("userLogin error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};


/*
 *  @desc Register a User
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var userRegister = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/user/register',
    token = Ti.App.Properties.getString("token");

  Ti.API.info('Register user, url: '+url);

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('X-CSRF-Token', token);

  var obj = JSON.stringify(opts.node);
  Ti.API.info('user object: '+ obj);

  xhr.send(obj);

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("userRegister error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "responseText":JSON.parse(xhr.responseText),
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
    url = REST_PATH + '/system/connect',
    token = Ti.App.Properties.getString("token");

  Ti.API.info('System info, url: '+url);

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.setRequestHeader('X-CSRF-Token', token);

  xhr.send();

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("systemInfo error: "+JSON.stringify(this));
    xhr.send();
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};

/*
 *  @desc Get token to provide crsf.
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var getToken = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/user/token';

  Ti.API.info('getToken info, url: '+url);

  xhr.open('POST', url);
  xhr.send();

  xhr.onload = function() {
    var jsonObject = JSON.parse(this.responseText);
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("getToken error: "+JSON.stringify(this));
    xhr.send();
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};

/*
 *  @desc Get list of user with search
 *  @param {Object} opts Utility payload, should have opts.success() and opts.error() callback functions
 *
 */
var searchUser = function(opts) {
  var xhr = Titanium.Network.createHTTPClient(),
    url = REST_PATH + '/duppp_user.json?username=' + opts.search;

  Ti.API.info('searchUser info, url: '+url);

  xhr.open('GET', url);
  xhr.send();

  xhr.onload = function() {
    var jsonObject = this.responseText;
    opts.success && opts.success(jsonObject);
  };
  xhr.onerror = function(e) {
    console.info("searchUser error: "+JSON.stringify(this));
    opts.error && opts.error({
      "status":xhr.status,
      "statusText":xhr.statusText
    });
  };
};

exports.nodeList = nodeList;
exports.userNodesList = userNodesList;
exports.userRetrieve = userRetrieve;
exports.nodeRetrieve = nodeRetrieve;
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
exports.getToken = getToken;
exports.searchUser = searchUser;
exports.nodeRetrieveComments = nodeRetrieveComments;
exports.createComment = createComment;
