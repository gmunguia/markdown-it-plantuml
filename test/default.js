'use strict';

var path     = require('path');
var generate = require('markdown-it-testgen');
var md = require('markdown-it');
var plantuml = require('../');

/*eslint-env mocha*/

describe('default diagram', function () {
  var parser = md().use(plantuml);

  generate(path.join(__dirname, 'fixtures/default.txt'), parser);
});
