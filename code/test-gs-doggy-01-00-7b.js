var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('GS Doggy')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Testing GS support. Try it with the Microsoft GS Wavetable Synth.\n')
  .smfText('If your synth supports GS, you must hear a dog.')
  .sxGS().ch(0).bank(1, 0).program(123)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
