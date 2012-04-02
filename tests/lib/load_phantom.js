var fs = require('fs')
  , page = new WebPage()
  , file = fs.absolute('tests/test.html');

page.onConsoleMessage = function(msg) {
  console.log(msg);
  if (msg === "success")
    phantom.exit(0);
  else
    phantom.exit(1);
};

page.onError = function (msg, trace) {
  console.log(msg);
  trace.forEach(function(item) {
    console.log('  ', item.file, ':', item.line);
  });
  phantom.exit(1);
};

page.open('file://' + file, function (status) {
  if (status !== 'success') {
    console.log('Failed to load the address');
    return phantom.exit(1);
  }
});