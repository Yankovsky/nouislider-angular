module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt)
  grunt.initConfig({
    ngmin: {
      'nouislider.min.js': 'nouislider.js'
    },
    uglify: {
      'nouislider.min.js': 'nouislider.min.js'
    }
  })
  grunt.registerTask('default', [
    'ngmin',
    'uglify'
  ])
}