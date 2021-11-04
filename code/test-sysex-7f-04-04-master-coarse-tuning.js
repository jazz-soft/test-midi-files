var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('SysEx Master Coarse Tuning Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Testing the Master Coarse Tuning via the GM2 Device Control SysEx.\n')
  .smfText('You must hear a C-Major scale.')
  .sxGM(2)
  .sxMasterCoarseTuningF(0)
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .sxMasterCoarseTuningF(2)
  .noteOn(1, 'C5', 127).tick(96).noteOff(1, 'C5')
  .sxMasterCoarseTuningF(4)
  .noteOn(2, 'C5', 127).tick(96).noteOff(2, 'C5')
  .sxMasterCoarseTuningF(5)
  .noteOn(3, 'C5', 127).tick(96).noteOff(3, 'C5')
  .sxMasterCoarseTuningF(7)
  .noteOn(4, 'C5', 127).tick(96).noteOff(4, 'C5')
  .sxMasterCoarseTuningF(9)
  .noteOn(5, 'C5', 127).tick(96).noteOff(5, 'C5')
  .sxMasterCoarseTuningF(11)
  .noteOn(6, 'C5', 127).tick(96).noteOff(6, 'C5')
  .sxMasterCoarseTuningF(12)
  .noteOn(7, 'C5', 127).tick(96).noteOff(7, 'C5')
  .sxMasterCoarseTuningF(0)
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
