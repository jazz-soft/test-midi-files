var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Control 0x7C OMNI Mode Off Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Sending the OMNI Mode Off message.\n')
  .smfText('Most modern devices don\'t have the OMNI Mode and will ignore this message.')
  .ch(0).omni(false).tick(96).smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
