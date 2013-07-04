module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    scandium: {
      ios_sim: {
        platform : 'ios',
        project_dir : './www/',
        log_level: 'info',
        options: {
          device_family: 'iphone',
          retina: true,
          tall: true
        },
      },
      ios_distrib: {
        platform : 'ios',
        project_dir : './www/',
        log_level: 'info',
        options: {
          distribution_name: 'Arthur Itey (628272242K)',
          pp_uuid: 'F2F065DA-B393-4705-91EF-4CCF07BE15DE',
          output_dir: '/Users/Atu/Sites/distrib',
          target: 'dist-adhoc',
          retina: true,
          tall: true
        },
      },
    }

  });

  grunt.loadNpmTasks('grunt-scandium');

  // Default task(s).
  grunt.registerTask('default', ['scandium:ios_sim']);
  grunt.registerTask('distrib', ['scandium:ios_distrib']);
};