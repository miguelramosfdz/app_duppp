module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-scandium');

  grunt.initConfig({
    scandium: {
      iphone: {
        platform : 'ios',
        project_dir : '/',
        force: false,
        build_only: false,
        sdk: '3.1.0',
        options: {
          device_family: 'iphone',
          sim_version: '6.1'
        }
      }
    }
  });

  grunt.registerTask('default', 'scandium');

}
