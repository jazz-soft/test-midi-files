var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(1, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Standard MIDI file type 1')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Two scales in two tracks must play simultaneously.\n')
  .smfText('Track 1').tick(96)
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .noteOn(0, 'D5', 127).tick(96).noteOff(0, 'D5')
  .noteOn(0, 'E5', 127).tick(96).noteOff(0, 'E5')
  .noteOn(0, 'F5', 127).tick(96).noteOff(0, 'F5')
  .noteOn(0, 'G5', 127).tick(96).noteOff(0, 'G5')
  .noteOn(0, 'A5', 127).tick(96).noteOff(0, 'A5')
  .noteOn(0, 'B5', 127).tick(96).noteOff(0, 'B5')
  .noteOn(0, 'C6', 127).tick(96).noteOff(0, 'C6');
trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfText('Track 2').tick(96)
  .noteOn(1, 'C#5', 127).tick(96).noteOff(1, 'C5#')
  .noteOn(1, 'D#5', 127).tick(96).noteOff(1, 'D5#')
  .noteOn(1, 'E#5', 127).tick(96).noteOff(1, 'E5#')
  .noteOn(1, 'F#5', 127).tick(96).noteOff(1, 'F5#')
  .noteOn(1, 'G#5', 127).tick(96).noteOff(1, 'G5#')
  .noteOn(1, 'A#5', 127).tick(96).noteOff(1, 'A5#')
  .noteOn(1, 'B#5', 127).tick(96).noteOff(1, 'B5#')
  .noteOn(1, 'C#6', 127).tick(96).noteOff(1, 'C6#')
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
