var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Control 0x7E MONO Mode On Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Sending the MONO Mode On message.\n')
  .smfText('Some devices don\'t have the MONO or the POLY Mode and will ignore this message.')
  .ch(0).mono().tick(96).smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
