var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk0 = new JZZ.MIDI.SMF.Chunk('Junk', 'This is not a MIDI track...');
smf.push(trk0);

var trk1 = new JZZ.MIDI.SMF.MTrk();
smf.push(trk1);
trk1.smfSeqName('Non-MIDI Track Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This test contains a non-MIDI track. Players should ignore it.\n')
  .smfText('You must hear a C-Major scale.')
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
