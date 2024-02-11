var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var data = JZZ.UMP.sxMidiSoft(0, 4, 'MidiSoft karaoke...');

var clip = new JZZ.MIDI.Clip();
clip.header
  .umpClipName(0, 'MIDI2 out of order SysEx')
  .umpCopyright(0, 'https:/jazz-soft.net')
  .umpMetadata(0, 'Testing MIDI2 out of order 7-bit sysex.\n');
clip
  .gr(0).umpMetadata('This file contains out of order 7-bit SysEx. Most likely, the player should ignore it.')
  .send(data[3])
  .send(data[2])
  .send(data[1])
  .send(data[0])
  .umpMetadata('Thank you!');

TEST.write(clip);
TEST.play(clip);
