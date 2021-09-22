var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('GM2 Doggy')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Testing GM2 support.\n')
  .smfText('If your synth supports GM2, you must hear a dog.')
  .sxGM(2).ch(0).bank(120, 0).program(56)
  .noteOn(76, 127).tick(96).noteOff(76)
  .noteOn(76, 127).tick(96).noteOff(76)
  .noteOn(76, 127).tick(96).noteOff(76)
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
