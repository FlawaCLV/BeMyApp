'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({


        // Compile less

        less: {
            // production config is also available
            development: {
                options: {
                    // Specifies directories to scan for @import directives when parsing. 
                    // Default value is the directory of the source, which is probably what you want.
                    paths: ["dist/"]
                },
                files: {
                    // compilation.css  :  source.less
                    "dist/main.min.css": "less/main.less"
                }
            }
        },


        // Minify CSS file

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/main.min.css': "dist/main.min.css"
                }
            }
        },


        // Concat JS files

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                // the files to concatenate
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                    'bower_components/ng-file-upload/ng-file-upload-all.js',
                    'js/main.js',
                    'js/main.js',
                    'js/directives/**/*.js',
                    'js/filters/**/*.js',
                    'js/services/**/*.js',
                    'js/controllers/**/*.js'
                ],
                // the location of the resulting JS file
                dest: 'dist/main.min.js'
            }
        },


        // Minify JS

        uglify: {
            options: {
                mangle: false
            },
            js: {
                files: {
                    'dist/main.min.js': ['dist/main.min.js']
                }
            }
        },


        // Watch files

        watch: {
            // if any .less file changes in directory "public/css/" run the "less"-task.
            files: ["less/**/*.less", "js/**/*.js"],
            tasks: ["less", "concat"]
        }


    });

    // the default task (running "grunt" in console) is "watch"
    grunt.registerTask('dev', [
        'less',
        'concat',
        'watch'
    ]);

    grunt.registerTask('prod', [
        'less',
        'cssmin',
        'concat',
        'uglify'
    ]);
};