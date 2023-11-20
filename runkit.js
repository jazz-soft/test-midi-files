const rkmidi = require("runkit-midi");
const TMF = require('test-midi-files');

const clip = new TMF.RawClip();
clip
  .umpDelta(0)
  .umpTicksPQN(96)
  .umpBPM(0, 120)
  .umpDelta(0).umpStartClip()
  .umpDelta(0).umpNoteOn(0, 0, 'C5').umpDelta(96).umpNoteOff(0, 0, 'C5')
  .umpDelta(0).umpNoteOn(0, 0, 'D5').umpDelta(96).umpNoteOff(0, 0, 'D5')
  .umpDelta(0).umpNoteOn(0, 0, 'E5').umpDelta(96).umpNoteOff(0, 0, 'E5')
  .umpDelta(0).umpNoteOn(0, 0, 'F5').umpDelta(96).umpNoteOff(0, 0, 'F5')
  .umpDelta(0).umpNoteOn(0, 0, 'G5').umpDelta(96).umpNoteOff(0, 0, 'G5')
  .umpDelta(0).umpNoteOn(0, 0, 'A5').umpDelta(96).umpNoteOff(0, 0, 'A5')
  .umpDelta(0).umpNoteOn(0, 0, 'B5').umpDelta(96).umpNoteOff(0, 0, 'B5')
  .umpDelta(0).umpNoteOn(0, 0, 'C6').umpDelta(96).umpNoteOff(0, 0, 'C6')
  .umpDelta(0).umpEndClip()

rkmidi(clip.dump());
// click the [▶run] button... ↓