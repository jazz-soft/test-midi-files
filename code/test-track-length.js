var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Track length test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Some silence at end of track, defining the track length\n')
  .smfText(' You must hear C5 and then the track ends after one half note!')
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .smfText('Thank you!')
  .tick(192).smfEndOfTrack();
TEST.write(smf);
TEST.play(smf);
