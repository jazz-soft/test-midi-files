var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var clip = new JZZ.MIDI.Clip();
clip.header
  .umpClipName(0, 'GS Doggy')
  .umpCopyright(0, 'https:/jazz-soft.net')
  .umpMetadata(0, 'Testing GS support. Try it with the Microsoft GS Wavetable Synth.\n');
clip
  .gr(0).umpMetadata('If your synth supports GS, you must hear a dog.')
  .sxGS().ch(0).umpProgram(123, 1, 0) // bank 1/0, program 123
  .umpNoteOn('C5').tick(96).umpNoteOff('C5')
  .umpNoteOn('C5').tick(96).umpNoteOff('C5')
  .umpNoteOn('C5').tick(96).umpNoteOff('C5')
  .umpMetadata('Thank you!');

TEST.write(clip);
TEST.play(clip);
