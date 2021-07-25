var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Multi-channel chords Test 0')
  .smfCopyright('https://jazz-soft.net')
  .smfText('A format 0 file with notes in three channels.\n')
  .smfText(' Now you must hear a chord at C5!')
  .noteOn(0, 'C5').noteOn(1, 'E5').noteOn(2, 'G5').tick(96).noteOff(0, 'C5').noteOff(1, 'E5').noteOff(2, 'G5')
  .smfText(' Now you must hear a chord at D5!')
  .noteOn(0, 'D5').noteOn(1, 'F5').noteOn(2, 'A5').tick(96).noteOff(0, 'D5').noteOff(1, 'F5').noteOff(2, 'A5')
  .smfText(' Now you must hear a chord at E5!')
  .noteOn(0, 'E5').noteOn(1, 'G5').noteOn(2, 'B5').tick(96).noteOff(0, 'E5').noteOff(1, 'G5').noteOff(2, 'B5')
  .smfText(' Now you must hear a chord at F5!')
  .noteOn(0, 'F5').noteOn(1, 'A5').noteOn(2, 'C6').tick(96).noteOff(0, 'F5').noteOff(1, 'A5').noteOff(2, 'C6')
  .smfText(' Now you must hear a chord at G5!')
  .noteOn(0, 'G5').noteOn(1, 'B5').noteOn(2, 'D6').tick(96).noteOff(0, 'G5').noteOff(1, 'B5').noteOff(2, 'D6')
  .smfText(' Now you must hear a chord at A5!')
  .noteOn(0, 'A5').noteOn(1, 'C6').noteOn(2, 'E6').tick(96).noteOff(0, 'A5').noteOff(1, 'C6').noteOff(2, 'E6')
  .smfText(' Now you must hear a chord at B6!')
  .noteOn(0, 'B5').noteOn(1, 'D6').noteOn(2, 'F6').tick(96).noteOff(0, 'B5').noteOff(1, 'D6').noteOff(2, 'F6')
  .smfText(' Now you must hear a chord at C6!')
  .noteOn(0, 'C6').noteOn(1, 'E6').noteOn(2, 'G6').tick(96).noteOff(0, 'C6').noteOff(1, 'E6').noteOff(2, 'G6')
  .smfText('Thank you!');
TEST.write(smf);
TEST.play(smf);
