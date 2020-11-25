var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('RPN Coarse Tuning Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This test modifies the Coarse Tuning via the Registered Parameter [0, 2].\n')
  .smfText('You must hear a C-Major scale.')
  .ch(0)
  .rpn(0, 2).dataMSB(0x40)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpn(0, 2).dataMSB(0x42)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpn(0, 2).dataMSB(0x44)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpn(0, 2).dataMSB(0x45)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpn(0, 2).dataMSB(0x47)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpn(0, 2).dataMSB(0x49)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpn(0, 2).dataMSB(0x4b)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpn(0, 2).dataMSB(0x4c)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .rpn(0, 2).dataMSB(0x40)
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
