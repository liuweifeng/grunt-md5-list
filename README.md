# grunt-md5-list

> Copy files to a specified directory, rename to hash, and then generate JSON file that recode the key-value of file path and hash.

> 拷贝文件到指定目录，根据MD5重命名，然后生成一个文件路径和hash对应关系的文档。

[![NPM version](https://badge.fury.io/js/grunt-md5-list.png)](http://badge.fury.io/js/grunt-md5-list)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Dependency Status](https://david-dm.org/liuweifeng/grunt-md5-list.png)](https://david-dm.org/liuweifeng/grunt-md5-list)

[![NPM](https://nodei.co/npm/grunt-md5-list.png)](https://nodei.co/npm/grunt-md5-list/)

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-md5-list --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-md5-list');
```

## The "md5_list" task

### Overview
In your project's Gruntfile, add a section named `md5_list` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  md5_list: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.algorithm
Type: `String`
Default value: `'md5'`

A string value that specific algorithm to generate hash.

#### options.encoding
Type: `String`
Default value: `'utf8'`

A string value that specific file encoding.

#### options.output
Type: `String`
Default value: `'dist.json'`

A string value that specific the output file.

#### options.sortByKey
Type: `String`
Default value: `'false'`

A Boolean value that whether the generated key-value Object is sorted by the key.

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  md5_list: {
    options: {},
    files: {
      expand: true,
      cwd: TEMP_DIR,
      src: ['js/**/*.js', 'css/**/*.css'],
      dest: 'dist/'
    },
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  md5_list: {
    options: {
      algorithm: 'sha1',
      output: 'assets.json'
    },
    files: {
      expand: true,
      cwd: TEMP_DIR,
      src: ['js/**/*.js', 'css/**/*.css'],
      dest: 'dist/'
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
**2013-07-31** `0.2.0`

>First version.

**2014-01-13** `0.4.0` 
>add sortByKey options
