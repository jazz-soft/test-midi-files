var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Control 0x41 Portamento Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Testing the Portamento effect.\n')
  .smfText('Two sequences must sound different.')
  .ch(0)
  .smfText('Portamento OFF.')
  .noteOn('C5', 127).tick(96)
  .noteOn('E5', 127).tick(96)
  .noteOn('G5', 127).tick(96)
  .noteOn('C6', 127).tick(96)
  .noteOff('C5').noteOff('E5').noteOff('G5').noteOff('C6')
  .tick(480)
  .portamento()
  .smfText('Portamento ON.')
  .noteOn('C5', 127).tick(96)
  .noteOn('E5', 127).tick(96)
  .noteOn('G5', 127).tick(96)
  .noteOn('C6', 127).tick(96)
  .noteOff('C5').noteOff('E5').noteOff('G5').noteOff('C6')
  .portamento(false)
  .tick(96)
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
