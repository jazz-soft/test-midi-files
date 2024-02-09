var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var data = JZZ.UMP.umpData(0, 'This is a 8-bit data that requires several UMP packets...');

var clip = new JZZ.MIDI.Clip();
clip.header
  .umpClipName(0, 'MIDI2 out of order Data')
  .umpCopyright(0, 'https:/jazz-soft.net')
  .umpMetadata(0, 'Testing MIDI2 out of order 8-bit data message.\n');
clip
  .gr(0).umpMetadata('This file contains out of order 8-bit data. Most likely, the player should ignore it.')
  .send(data[4])
  .send(data[3])
  .send(data[2])
  .send(data[1])
  .send(data[0])
  .umpMetadata('Thank you!');

TEST.write(clip);
TEST.play(clip);
