const { execSync } = require('child_process');

module.exports = function(grunt) {
  grunt.task.registerTask('midi', 'Generate MIDI files', function() {
    grunt.file.expand('code/*.js').forEach(file => {
      execSync('node ' + file + ' null', {stdio: 'inherit'});
    });
  });
  grunt.task.registerTask('list', 'List MIDI files', function() {
    var i, j, a;
    var midis = [];
    var list = '' + execSync('git ls-files midi');
    list = list.split('\n');
    for (i = 0; i < list.length; i++) {
      a = list[i].split('/');
      if (a.length == 2) midis.push(a[1]);
    }
    function group(s) {
      if (s == 'test-c-major-scale.mid') return 0;
      if (s.includes('karaoke')) return 2;
      if (s.includes('non-midi')) return 3;
      if (s.includes('vlq')) return 4;
      if (s.includes('illegal')) return 5;
      if (s.includes('corrupt')) return 5;
      if (s.includes('syx')) return 5;
      return 1;
    }
    midis.sort(function(a, b) {
      var aa = group(a);
      var bb = group(b);
      return aa == bb ? a.localeCompare(b) : aa - bb;
    });
    var rdme = grunt.file.read('README.md').split(/\r?\n/);
    var out = [];
    for (i = 0; i < rdme.length; i++) {
      out.push(rdme[i]);
      if (rdme[i] == '## Test files') break;
    }
    for (; i < rdme.length; i++) if (rdme[i] == '## More to come...') break;
    for (j = 0; j < midis.length; j++) out.push('- [**' + midis[j] + '**](https://github.com/jazz-soft/test-midi-files/raw/main/midi/' + midis[j] + ')');
    for (; i < rdme.length; i++) out.push(rdme[i]);
    grunt.file.write('README.md', out.join(require('os').EOL));
  });

  grunt.registerTask('default', ['midi', 'list']);
};
