var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Note-On Velocity Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Playing C5 with different velocities.\n')
  .smfText('You must hear a C-Major scale.')
  .smfText('Velocity = 1')
  .noteOn(0, 'C5', 1).tick(96).noteOff(0, 'C5')
  .smfText('Velocity = 16')
  .noteOn(0, 'C5', 16).tick(96).noteOff(0, 'C5')
  .smfText('Velocity = 32')
  .noteOn(0, 'C5', 32).tick(96).noteOff(0, 'C5')
  .smfText('Velocity = 48')
  .noteOn(0, 'C5', 48).tick(96).noteOff(0, 'C5')
  .smfText('Velocity = 64')
  .noteOn(0, 'C5', 64).tick(96).noteOff(0, 'C5')
  .smfText('Velocity = 80')
  .noteOn(0, 'C5', 80).tick(96).noteOff(0, 'C5')
  .smfText('Velocity = 96')
  .noteOn(0, 'C5', 96).tick(96).noteOff(0, 'C5')
  .smfText('Velocity = 112')
  .noteOn(0, 'C5', 112).tick(96).noteOff(0, 'C5')
  .smfText('Velocity = 127')
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
