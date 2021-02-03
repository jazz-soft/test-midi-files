var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('SysEx Master Fine Tuning Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Testing the Master Fine Tuning via the GM2 Device Control SysEx.\n')
  .smfText('You must hear a quarter-tone sequence.')
  .send([0xF0, 0x7F, 0x7F, 0x04, 0x03, 0x00, 0x00, 0xF7])
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .send([0xF0, 0x7F, 0x7F, 0x04, 0x03, 0x00, 0x20, 0xF7])
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .send([0xF0, 0x7F, 0x7F, 0x04, 0x03, 0x00, 0x40, 0xF7])
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .send([0xF0, 0x7F, 0x7F, 0x04, 0x03, 0x00, 0x60, 0xF7])
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .send([0xF0, 0x7F, 0x7F, 0x04, 0x03, 0x7F, 0x7F, 0xF7])
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .send([0xF0, 0x7F, 0x7F, 0x04, 0x03, 0x00, 0x40, 0xF7])
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
