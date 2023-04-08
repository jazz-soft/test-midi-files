var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Sound of Silence - End of Track')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This test should send the End-of-Track metaevent after 5 seconds. Some players may terminate it immediately.\n')
  .tick(960)
  .smfEndOfTrack();

TEST.write(smf);
TEST.play(smf);
