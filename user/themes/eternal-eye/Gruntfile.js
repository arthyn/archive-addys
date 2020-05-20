'use strict';

const sass = require('node-sass')
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        dist: 'build'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

         watch : {
          sass : {
            files : ['scss/**/*.scss'],
            tasks : ['sass:dev', 'autoprefixer'],
            options : {
              livereload : 35732
            }
          },
          js : {
            files : ['js/**/*.js'],
            options : {
              livereload : 35732
            }
          }
        },

        // Dev and production build for sass
        sass : {
          options: {
            implementation: sass
          },
          production : {
            files : [
              {
                src : ['**/*.scss', '!**/_*.scss'],
                cwd : 'scss',
                dest : 'css-compiled',
                ext : '.css',
                expand : true
              }
            ],
            options : {
              style : 'compressed'
            }
          },
          dev : {
            files : [
              {
                src : ['**/*.scss', '!**/_*.scss'],
                cwd : 'scss',
                dest : 'css-compiled',
                ext : '.css',
                expand : true
              }
            ],
            options : {
              style : 'expanded'
            }
          }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '*/<%= config.dist %>/*',
                        '!*/<%= config.dist %>/.git*',
                        'css-compiled/*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Auto prefixer settings for browser prefixes
        autoprefixer: {
          options: {
            browsers: ['last 5 versions']
          },
          dist: {
            files: [{
              expand: true,
              cwd: 'css-compiled',
              src: '**/*.css',
              dest: 'css-compiled'
            }]
          }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'css-compiled',
                    dest: 'css-compiled/<%= config.dist %>',
                    src: 'fonts/{,*/}*.*'
                }]
            },
        }
    });

    // Default task
    grunt.registerTask('default', ['watch']);
    
    grunt.registerTask('build', [
        'clean:dist',
        'sass:production',
        'autoprefixer',
        //'copy:dist',
    ]);


};
