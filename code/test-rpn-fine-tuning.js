var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('RPN Fine Tuning Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This test modifies the Fine Tuning via the Registered Parameter [0, 1].\n')
  .smfText('You must hear a quarter-tone scale.')
  .rpn(0, 0, 1).data(0, 0x40, 0)
  .rpn(1, 0, 1).data(1, 0x60, 0)
  .noteOn(0, 0x40, 0x7f).tick(96).noteOff(0, 0x40)
  .noteOn(1, 0x40, 0x7f).tick(96).noteOff(1, 0x40)
  .noteOn(0, 0x41, 0x7f).tick(96).noteOff(0, 0x41)
  .noteOn(1, 0x41, 0x7f).tick(96).noteOff(1, 0x41)
  .noteOn(0, 0x42, 0x7f).tick(96).noteOff(0, 0x42)
  .noteOn(1, 0x42, 0x7f).tick(96).noteOff(1, 0x42)
  .noteOn(0, 0x43, 0x7f).tick(96).noteOff(0, 0x43)
  .noteOn(1, 0x43, 0x7f).tick(96).noteOff(1, 0x43)
  .noteOn(0, 0x44, 0x7f).tick(96).noteOff(0, 0x44)
  .noteOn(1, 0x44, 0x7f).tick(96).noteOff(1, 0x44)
  .noteOn(0, 0x45, 0x7f).tick(96).noteOff(0, 0x45)
  .noteOn(1, 0x45, 0x7f).tick(96).noteOff(1, 0x45)
  .noteOn(0, 0x46, 0x7f).tick(96).noteOff(0, 0x46)
  .noteOn(1, 0x46, 0x7f).tick(96).noteOff(1, 0x46)
  .noteOn(0, 0x47, 0x7f).tick(96).noteOff(0, 0x47)
  .noteOn(1, 0x47, 0x7f).tick(96).noteOff(1, 0x47)
  .noteOn(0, 0x48, 0x7f).tick(96).noteOff(0, 0x48)
  .noteOn(1, 0x48, 0x7f).tick(96).noteOff(1, 0x48)
  .noteOn(0, 0x49, 0x7f).tick(96).noteOff(0, 0x49)
  .noteOn(1, 0x49, 0x7f).tick(96).noteOff(1, 0x49)
  .noteOn(0, 0x4a, 0x7f).tick(96).noteOff(0, 0x4a)
  .noteOn(1, 0x4a, 0x7f).tick(96).noteOff(1, 0x4a)
  .noteOn(0, 0x4b, 0x7f).tick(96).noteOff(0, 0x4b)
  .noteOn(1, 0x4b, 0x7f).tick(96).noteOff(1, 0x4b)
  .noteOn(0, 0x4c, 0x7f).tick(96).noteOff(0, 0x4c)
  .rpn(1, 0, 1).data(1, 0x40, 0)
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
