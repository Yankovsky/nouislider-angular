module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt)
  grunt.initConfig({
    uglify: {
      'nouislider.min.js': 'nouislider.js'
    }
  })
  grunt.registerTask('default', [
    'uglify'
  ])
}