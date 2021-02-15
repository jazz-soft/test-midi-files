var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('GM2 System On')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This test enables the GM2 System (on the supported devices).\n')
  .smfText('You can try another test to check if there is any difference.')
  .sxGM(2)
  .tick(96).smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
