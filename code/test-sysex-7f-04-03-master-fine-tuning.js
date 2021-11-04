var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('SysEx Master Fine Tuning Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Testing the Master Fine Tuning via the GM2 Device Control SysEx.\n')
  .smfText('You must hear a quarter-tone sequence.')
  .sxGM(2)
  .sxMasterFineTuningF(-.9999)
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .sxMasterFineTuningF(-.5)
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .sxMasterFineTuningF(0)
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .sxMasterFineTuningF(.5)
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .sxMasterFineTuningF(.9999)
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .sxMasterFineTuningF(0)
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
