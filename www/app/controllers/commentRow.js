var args = arguments[0] || {};

// Map field with correct values
$.name.text = args.name;
$.commentBody.text = args.comment_body.und[0].value;
$.created.text = moment.unix(args.created).fromNow();
