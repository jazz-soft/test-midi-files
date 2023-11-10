var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var clip = new JZZ.MIDI.Clip();
clip.header
  .umpClipName(0, 'Text Message Test')
  .umpCopyright(0, 'https:/jazz-soft.net')
  .umpMetadata(0, 'Various MIDI 2.0 text messages');
clip
  .umpMetadata(0, 'Metadata per group')
  .umpCMetadata(0, 0, 'Metadata per channel');

TEST.write(clip);
TEST.play(clip);
