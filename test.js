const webPage = require('webpage');
const system = require('system');
const page = webPage.create();

page.open('./client/test/test.html', function(status) {

  page.evaluate(function(xxx) {
    console.log(document.title);
  });

  phantom.exit(0);

});

page.onConsoleMessage = function(msg) {
  system.stderr.writeLine('console: ' + msg);
};