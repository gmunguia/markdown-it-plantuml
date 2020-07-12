'use strict';

var path = require('path');
var generate = require('markdown-it-testgen');
var md = require('markdown-it');
var plantuml = require('../');
var assert = require('assert');
var fs = require('fs');
var jsdom = require('jsdom');

var defaultDocument = fs.readFileSync(path.join(__dirname, 'fixtures/default.txt'), 'utf-8');

/*eslint-env mocha*/

describe('markdown-it-plantuml', function () {
  var defaultParser = md().use(plantuml);

  generate(
    path.join(__dirname, 'fixtures/default.txt'),
    { header: true },
    defaultParser
  );

  var ditaaParser = md().use(
    plantuml,
    {
      openMarker: '@startditaa',
      closeMarker: '@endditaa',
      diagramName: 'ditaa'
    }
  );

  generate(
    path.join(__dirname, 'fixtures/ditaa.txt'),
    { header: true },
    ditaaParser
  );

  var pngParser = md().use(plantuml, { imageFormat: 'png' });

  generate(
    path.join(__dirname, 'fixtures/png.txt'),
    { header: true },
    pngParser
  );

  var parserWithCustomServer = md().use(plantuml, { server: 'http://example.com/plantuml' });

  generate(
    path.join(__dirname, 'fixtures/server.txt'),
    { header: true },
    parserWithCustomServer
  );

  describe('when option.className is unset', function () {
    var dom = new jsdom.JSDOM(defaultParser.parse(defaultDocument), 'text/html');
    it('should generate img tags with empty class attribute', function () {
      var images = dom.window.document.getElementsByTagName('img');
      for (var i = 0; i < images.length; ++i) {
        assert.equals(images[i].className, '');
      }
    });
  });

  describe('when option.className is set to plantuml', function () {
    var parserWithClass = md().use(plantuml, { className: 'plantuml' });
    var dom = new jsdom.JSDOM(parserWithClass.parse(defaultDocument), 'text/html');
    it('should generate img tags with class="plantuml"', function () {
      var images = dom.window.document.getElementsByTagName('img');
      for (var i = 0; i < images.length; ++i) {
        assert.equals(images[i].className, 'plantuml');
      }
    });
  });
});
