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
  .sxXG().ch(0).umpProgram(0, 126, 0) // bank 126/0, program 0
  .umpNoteOn(84).tick(96).umpNoteOff(84)
  .umpNoteOn(84).tick(96).umpNoteOff(84)
  .umpNoteOn(84).tick(96).umpNoteOff(84)
  .umpMetadata('Thank you!');

TEST.write(clip);
TEST.play(clip);
