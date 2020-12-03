const { execSync } = require('child_process');

module.exports = function(grunt) {
  grunt.task.registerTask('midi', 'Generate MIDI files', function() {
    grunt.file.expand('code/*.js').forEach(file => {
      execSync('node ' + file + ' null', {stdio: 'inherit'});
    });
  });
  grunt.registerTask('default', ['midi']);
};
