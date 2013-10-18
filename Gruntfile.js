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
      ios_device: {
        platform : 'ios',
        project_dir : './www/',
        options: {
          distribution_name: 'Arthur Itey (628272242K)',
          pp_uuid: 'EFA13848-144D-46DE-9AB1-7FE785AEE428',
          developer_name: 'Arthur Itey (JU5JW4MF8W)',
          device_family: 'iphone',
          target: 'device',
        },
      },
      ios_adhoc: {
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
      ios_distrib: {
        platform : 'ios',
        project_dir : './www/',
        log_level: 'info',
        options: {
          distribution_name: 'Arthur Itey (628272242K)',
          pp_uuid: 'F2F065DA-B393-4705-91EF-4CCF07BE15DE',
          output_dir: '/Users/Atu/Sites/distrib',
          target: 'dist-appstore',
          retina: true,
          tall: true
        },
      },

    }

  });

  grunt.loadNpmTasks('grunt-scandium');

  // Default task(s).
  grunt.registerTask('default', ['scandium:ios_sim']);
  grunt.registerTask('device', ['scandium:ios_device']);
  grunt.registerTask('distrib', ['scandium:ios_distrib']);
  grunt.registerTask('adhoc', ['scandium:ios_adhoc']);

};
