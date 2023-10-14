var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var clip = new TEST.RawClip();

clip
  .umpDelta(0)
  .umpTicksPQN(96)
  .umpBPM(1, 120)
  .umpDelta(0).umpStartClip()
  .umpDelta(0).umpNoteOn(1, 0, 'C5').umpDelta(96).umpNoteOff(1, 0, 'C5')
  .umpDelta(0).umpNoteOn(1, 0, 'D5').umpDelta(96).umpNoteOff(1, 0, 'D5')
  .umpDelta(0).umpNoteOn(1, 0, 'E5').umpDelta(96).umpNoteOff(1, 0, 'E5')
  .umpDelta(0).umpNoteOn(1, 0, 'F5').umpDelta(96).umpNoteOff(1, 0, 'F5')
  .umpDelta(0).umpNoteOn(1, 0, 'G5').umpDelta(96).umpNoteOff(1, 0, 'G5')
  .umpDelta(0).umpNoteOn(1, 0, 'A5').umpDelta(96).umpNoteOff(1, 0, 'A5')
  .umpDelta(0).umpNoteOn(1, 0, 'B5').umpDelta(96).umpNoteOff(1, 0, 'B5')
  .umpDelta(0).umpNoteOn(1, 0, 'C6').umpDelta(96).umpNoteOff(1, 0, 'C6')
  .umpDelta(0).umpEndClip()

TEST.write(clip);
TEST.play(clip);
