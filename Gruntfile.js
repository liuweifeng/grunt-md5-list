/*
 * grunt-md5-list
 * https://github.com/liuweifeng/grunt-md5-list
 *
 * Copyright (c) 2013 liuweifeng
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    md5_list: {
      default_options: {
        options: {
          output: 'tmp/default_options/hash.json'
        },
        files: [{
          expand: true,
          cwd: 'test',
          src: ['data/*.txt'],
          dest: 'tmp/default_options/'
        }]
      },
      custom_options: {
        options: {
          output: 'tmp/custom_options/hash.json',
          algorithm:'sha1'
        },
        files: [{
          expand: true,
          cwd: 'test',
          src: ['data/*.txt'],
          dest: 'tmp/custom_options/'
        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'md5_list', 'nodeunit', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};