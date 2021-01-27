var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('RPN Coarse Tuning Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This test modifies the Coarse Tuning via the Registered Parameter [0, 2].\n')
  .smfText('You must hear a C-Major scale.')
  .ch(0)
  .rpnCoarseTuningF(0)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpnCoarseTuningF(2)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpnCoarseTuningF(4)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpnCoarseTuningF(5)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpnCoarseTuningF(7)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpnCoarseTuningF(9)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpnCoarseTuningF(11)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpnCoarseTuningF(12)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpnCoarseTuningF(0)
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
