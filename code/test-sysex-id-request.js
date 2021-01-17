var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('SysEx ID Request Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This test sends an Identity Request SysEx.\n')
  .smfText('Your device may respond with an Identity Response SysEx.')
  .sxIdRequest()
  .tick(96).smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
