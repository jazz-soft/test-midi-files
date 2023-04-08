var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Sound of Silence - All Notes Off')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This test send the All-Notes-Off message after 5 seconds.\n')
  .smfText('This test should play nothing for 5 seconds.\n')
  .tick(960)
  .allNotesOff(0);

TEST.write(smf);
TEST.play(smf);
