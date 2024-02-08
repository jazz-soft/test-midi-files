var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var clip = new JZZ.MIDI.Clip();
clip.header
  .umpClipName(0, 'MIDI2 Data')
  .umpCopyright(0, 'https:/jazz-soft.net')
  .umpMetadata(0, 'Testing MIDI2 8-bit data message.\n');
clip
  .gr(0).umpMetadata('This file contains 8-bit data. No sound.')
  .umpData('This is a 8-bit data that requires several UMP packets...')
  .umpMetadata('Thank you!');

TEST.write(clip);
TEST.play(clip);
