var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var clip = new JZZ.MIDI.Clip();
clip.header
  .umpClipName(0, 'GM2 Doggy')
  .umpCopyright(0, 'https:/jazz-soft.net')
  .umpMetadata(0, 'Testing GM2 support.\n');
clip
  .gr(0).umpMetadata('If your synth supports GM2, you must hear a dog.')
  .sxGM(2).ch(0).umpProgram(56, 120, 0) // bank 120/0, program 56
  .umpNoteOn(76).tick(96).umpNoteOff(76)
  .umpNoteOn(76).tick(96).umpNoteOff(76)
  .umpNoteOn(76).tick(96).umpNoteOff(76)
  .umpMetadata('Thank you!');

TEST.write(clip);
TEST.play(clip);
