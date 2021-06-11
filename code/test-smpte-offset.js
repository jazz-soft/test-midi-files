var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
var smpte = new JZZ.SMPTE(30, 0, 1);
trk.smfSMPTE(smpte)
  .smfSeqName('SMPTE Offset Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This test starts with a 1 minute SMPTE offset.\n')
  .smfText('Most players will ignore it.')
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .noteOn(0, 'D5', 127).tick(96).noteOff(0, 'D5')
  .noteOn(0, 'E5', 127).tick(96).noteOff(0, 'E5')
  .noteOn(0, 'F5', 127).tick(96).noteOff(0, 'F5')
  .noteOn(0, 'G5', 127).tick(96).noteOff(0, 'G5')
  .noteOn(0, 'A5', 127).tick(96).noteOff(0, 'A5')
  .noteOn(0, 'B5', 127).tick(96).noteOff(0, 'B5')
  .noteOn(0, 'C6', 127).tick(96).noteOff(0, 'C6')
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
