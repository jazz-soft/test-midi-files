var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var clip = new JZZ.MIDI.Clip();
clip.header
  .umpClipName(0, 'XG Doggy')
  .umpCopyright(0, 'https:/jazz-soft.net')
  .umpMetadata(0, 'Testing XG support.\n');
clip
  .gr(0).umpMetadata('If your synth supports XG, you must hear a dog.')
  .sxXG().ch(0).umpProgram(48, 64, 0) // bank 64/0, program 48
  .umpNoteOn('C5').tick(96).umpNoteOff('C5')
  .umpNoteOn('C5').tick(96).umpNoteOff('C5')
  .umpNoteOn('C5').tick(96).umpNoteOff('C5')
  .umpMetadata('Thank you!');

TEST.write(clip);
TEST.play(clip);
