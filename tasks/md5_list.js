/*
 * grunt-md5-list
 * https://github.com/liuweifeng/grunt-md5-list
 *
 * Copyright (c) 2013 liuweifeng
 * Licensed under the MIT license.
 */

'use strict';

var crypto = require('crypto');
var path = require('path');
var fs = require('fs');

function fixZero(d) {
  return d > 9 ? d : '0' + d;
}

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('md5_list', 'Copy files to a specified directory, according to the MD5 Rename, and then generate a file path and hash correspondence between documents.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      algorithm: 'md5',
      encoding: 'utf8'
    });

    var done = this.async();

    var json = {};
    var outputFile = options.output;

    // If the output file already exists, try to read it
    if (outputFile && grunt.file.exists(outputFile)) {
      try {
        json = grunt.file.readJSON(outputFile);
      } catch (e) {
        console.log(e);
      }
    }

    var date = new Date();
    date = date.getFullYear() + '-' + fixZero(date.getMonth() + 1) + '-' + fixZero(date.getDate()) + ' ' + fixZero(date.getHours()) + ':' + fixZero(date.getMinutes()) + ':' + fixZero(date.getSeconds());
    var counter = this.filesSrc.length;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      if (!f.dest) {
        grunt.log.error('Dest map file does not specified');
        return false;
      }
      var encoding = options.encoding;
      var cwd = f.orig.cwd;
      var mapping = [];
      var dest = f.orig.dest;



      var src = f.src.filter(function(filepath) {
        // filepath = realpath(filepath);
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });
      // console.log(src);
      src.forEach(function(filepath) {
        var r = filepath;

        var extname = path.extname(r);
        var basename = path.basename(r, extname);
        var key = path.relative(cwd, filepath).replace(extname, '');
        var shasum = crypto.createHash(options.algorithm);
        var s = fs.ReadStream(r);
        s.on('data', function(data) {
          shasum.update(data, encoding);
        });
        s.on('end', function() {
          var d = shasum.digest('hex');

          // 版本号文件中不存在此Key值（新增文件），或者hash有变化（修改），存储对应关系
          if (!json[key] || json[key].hash !== d) {
            // console.log(key, '\t更新', d);
            json[key] = json[key] || {};
            json[key].hash = d;
            json[key].time = date;
          }

          //拷贝改名后的文件到dist目录
          if (dest) {
            // console.log(dest)
            grunt.file.copy(r, path.join(dest, key + '-' + d + extname));
            grunt.log.oklns('File: "' + r + ' copy to build dest.');
          }
          if (!--counter) {
            output();
          }
        });
      });


      // function realpath(filepath) {
      //     return filepath;
      //     // return cwd ? path.join(cwd, filepath) : filepath;
      // }

      function output() {
        var sortByKey = options.sortByKey;
        if (sortByKey) {
          var keys = Object.keys(json),
            i, k, len = keys.length,
            tmp = {};
          keys.sort();
          for (i = 0; i < len; i++) {
            k = keys[i];
            tmp[k] = json[k];
          }
          json = tmp;
          tmp = null;
        }
        grunt.file.write(outputFile, JSON.stringify(json, null, 4));
        done();
      }
    });
  });
};