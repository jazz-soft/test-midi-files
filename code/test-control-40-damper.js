var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Control 0x40 Damper Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Testing the Damper pedal effect.\n')
  .smfText('Two sequences must sound different.')
  .ch(0)
  .smfText('Damper OFF...')
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .noteOn('E5', 127).tick(96).noteOff('E5')
  .noteOn('G5', 127).tick(96).noteOff('G5')
  .noteOn('C6', 127).tick(96).noteOff('C6')
  .tick(480)
  .damper()
  .smfText('Damper ON...')
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .noteOn('E5', 127).tick(96).noteOff('E5')
  .noteOn('G5', 127).tick(96).noteOff('G5')
  .noteOn('C6', 127).tick(96).noteOff('C6')
  .tick(192)
  .damper(false)
  .tick(96)
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
