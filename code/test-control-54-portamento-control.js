var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Control 0x54 PTC Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Testing the Portamento Control function.\n')
  .smfText('You must hear a cool portamento effect.')
  .ch(0)
  .portamentoTimeF(.5).ptc('C4').noteOn('C5', 127).tick(480).noteOff('C5')
  .tick(96)
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
