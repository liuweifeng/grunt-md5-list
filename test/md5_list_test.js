'use strict';

var grunt = require('grunt');
var crypto = require('crypto');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.md5_list = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(2);

    var result = grunt.file.readJSON('tmp/default_options/hash.json');
    var content = grunt.file.read('test/data/1.txt');
    var hash = crypto.createHash('md5').update(content).digest('hex');
    test.ok(grunt.file.exists('tmp/default_options/data/1-' + hash + '.txt'));
    test.equal(result['data/1']['hash'], hash);
    test.done();
  },
  custom_options: function(test) {
    test.expect(2);

    var result = grunt.file.readJSON('tmp/custom_options/hash.json');
    var content = grunt.file.read('test/data/1.txt');
    var hash = crypto.createHash('sha1').update(content).digest('hex');
    test.ok(grunt.file.exists('tmp/custom_options/data/1-' + hash + '.txt'));
    test.equal(result['data/1']['hash'], hash);
    test.done();
  },
};