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
  .sxGM(2).ch(0).umpProgram(123, 121, 1) // bank 121/1, program 123
  .umpNoteOn('C5').tick(96).umpNoteOff('C5')
  .umpNoteOn('C5').tick(96).umpNoteOff('C5')
  .umpNoteOn('C5').tick(96).umpNoteOff('C5')
  .umpMetadata('Thank you!');

TEST.write(clip);
TEST.play(clip);
