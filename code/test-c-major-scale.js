var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('C Major Scale Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This is the most basic MIDI test to serve a template for more useful tests.\n')
  .smfText('You must hear a C-Maor scale.')
  .smfText(' Now you must hear C5!')
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .smfText(' Now you must hear D5!')
  .noteOn(0, 'D5', 127).tick(96).noteOff(0, 'D5')
  .smfText(' Now you must hear E5!')
  .noteOn(0, 'E5', 127).tick(96).noteOff(0, 'E5')
  .smfText(' Now you must hear F5!')
  .noteOn(0, 'F5', 127).tick(96).noteOff(0, 'F5')
  .smfText(' Now you must hear G5!')
  .noteOn(0, 'G5', 127).tick(96).noteOff(0, 'G5')
  .smfText(' Now you must hear A5!')
  .noteOn(0, 'A5', 127).tick(96).noteOff(0, 'A5')
  .smfText(' Now you must hear B5!')
  .noteOn(0, 'B5', 127).tick(96).noteOff(0, 'B5')
  .smfText(' Now you must hear C6!')
  .noteOn(0, 'C6', 127).tick(96).noteOff(0, 'C6')
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
