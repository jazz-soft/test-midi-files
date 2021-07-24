var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Multi-channel chords Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText(' Now you must hear C major chord!')
  .noteOn(0, 'C5').noteOn(1, 'E5').noteOn(2, 'G5').tick(96).noteOff(0, 'C5').noteOff(1, 'E5').noteOff(2, 'G5')
  .smfText(' Now you must hear D major chord!')
  .noteOn(0, 'D5').noteOn(1, 'F#5').noteOn(2, 'A5').tick(96).noteOff(0, 'D5').noteOff(1, 'F#5').noteOff(2, 'A5')
  .smfText(' Now you must hear E major chord!')
  .noteOn(0, 'E5').noteOn(1, 'G#5').noteOn(2, 'B5').tick(96).noteOff(0, 'E5').noteOff(1, 'G#5').noteOff(2, 'B5')
  .smfText(' Now you must hear F major chord!')
  .noteOn(0, 'F5').noteOn(1, 'A5').noteOn(2, 'C6').tick(96).noteOff(0, 'F5').noteOff(1, 'A5').noteOff(2, 'C6')
  .smfText(' Now you must hear G major chord!')
  .noteOn(0, 'G5').noteOn(1, 'B5').noteOn(2, 'D6').tick(96).noteOff(0, 'G5').noteOff(1, 'B5').noteOff(2, 'D6')
  .smfText(' Now you must hear A major chord!')
  .noteOn(0, 'A5').noteOn(1, 'C#6').noteOn(2, 'E6').tick(96).noteOff(0, 'A5').noteOff(1, 'C#6').noteOff(2, 'E6')
  .smfText(' Now you must hear B major chord!')
  .noteOn(0, 'B5').noteOn(1, 'D#6').noteOn(2, 'F#6').tick(96).noteOff(0, 'B5').noteOff(1, 'D#6').noteOff(2, 'F#6')
  .smfText(' Now you must hear C major chord!')
  .noteOn(0, 'C6').noteOn(1, 'E6').noteOn(2, 'G6').tick(96).noteOff(0, 'C6').noteOff(1, 'E6').noteOff(2, 'G6')
  .smfText('Thank you!');
TEST.write(smf);
TEST.play(smf);
