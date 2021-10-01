var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('XG Doggy')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Testing XG support.\n')
  .smfText('If your synth supports XG, you must hear a dog.')
  .sxXG().ch(0).bank(126, 0).program(0)
  .noteOn(84, 127).tick(96).noteOff(84)
  .noteOn(84, 127).tick(96).noteOff(84)
  .noteOn(84, 127).tick(96).noteOff(84)
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
