var CONFIG = arguments[0] || {};
var moment = require('alloy/moment');

// Map field with correct values
$.name.text = CONFIG.name;
$.commentBody.text = CONFIG.comment_body.und[0].value;
$.created.text = moment.unix(CONFIG.created).fromNow();