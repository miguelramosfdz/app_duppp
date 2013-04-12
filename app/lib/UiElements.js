/**
 * Indicator window with a spinner and a label
 *
 * @param {Object} args
 */
function createIndicatorWindow(args) {
  var width = 110,
    height = 110;

  var args = args || {};
  var top = args.top || "35%";
  var text = args.text || 'Loading';

  var win = Titanium.UI.createWindow({
    height:           height,
    width:            width,
    top:              top,
    borderRadius:     10,
    touchEnabled:     false,
    backgroundColor:  '#000',
    opacity:          0.8
  });

  var view = Ti.UI.createView({
    width:   Ti.UI.SIZE,
    height:  Ti.UI.FILL,
    center:  { x: (width/2), y: (height/2) },
    layout:  'vertical'
  });

  var activityIndicator = Ti.UI.createActivityIndicator({
    top: 20,
    style:   Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
    width:   30
  });

  var label = Titanium.UI.createLabel({
    text:    text,
    color:   '#fff',
    font:    { fontFamily: 'Helvetica Neue', fontSize: 16, fontWeight: 'bold' },
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
    top: 10
  });

  view.add(activityIndicator);
  view.add(label);
  win.add(view);

  function openIndicator() {
    win.open();
    activityIndicator.show();
  }

  win.openIndicator = openIndicator;

  function closeIndicator() {
    activityIndicator.hide();
    win.close();
  }

  win.closeIndicator = closeIndicator;

  return win;
}

// Public interface
exports.createIndicatorWindow = createIndicatorWindow;
