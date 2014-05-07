module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            banner:
                '// Marionette.GroupedCollectionView\n' +
                '// --------------------\n' +
                '// v<%= pkg.version %>\n' +
                '// \n' +
                '// Copyright (c) <%= grunt.template.today("yyyy") %> Mattias Rydengren <mattias.rydengren@coderesque.com>\n' +
                '// Distributed under MIT license\n' +
                '\n'
        },

        concat: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: 'src/marionette.groupedcollectionview.js' ,
                dest: 'lib/marionette.groupedcollectionview.js'
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [ 'src/marionette.groupedcollectionview.js' ]
        },

        uglify: {
            options: {
                banner: '<%= meta.banner %>',
                sourceMap: true
            },
            dist: {
                files: {
                    'lib/marionette.groupedcollectionview.min.js': [ 'src/marionette.groupedcollectionview.js' ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'jshint', 'concat', 'uglify' ]);
};