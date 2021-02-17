var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);

trk = trk.smfSeqName('Pitch Bend Range Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This test sets various Pitch Bend ranges via the Registered Parameter [0, 0].\n')

trk = trk.ch(0).program(16).rpn(0, 0).data(2, 0).smfText('Default Pitch Bend range is plus/minus two semitones.');
trk = bend(trk);
trk = trk.tick(96).rpn(0, 0).data(0, 0x40).smfText('Pitch Bend range is set to plus/minus half semitone.');
trk = bend(trk);
trk = trk.tick(96).rpn(0, 0).data(12, 0).smfText('Pitch Bend range is set to plus/minus one octave.');
trk = bend(trk);
trk = trk.tick(96).rpn(0, 0).data(24, 0).smfText('Pitch Bend range is set to plus/minus two octaves.');
trk = bend(trk);
trk = trk.tick(96).rpn(0, 0).data(36, 0).smfText('Pitch Bend range is set to plus/minus three octaves.');
trk = bend(trk);
trk.rpn(0, 0).data(2, 0) // back to the default
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);

function bend(trk) {
  var i;
  var T = 192;
  trk = trk.noteOn(60).tick(96);
  for (i = 0; i < T; i++) {
    trk = trk.pitchBendF((Math.cos(i * Math.PI / T) - 1) / 2).tick(1);
  }
  trk = trk.tick(48);
  for (i = 0; i < 2 * T; i++) {
    trk = trk.pitchBendF(-Math.cos(i * Math.PI / 2 / T)).tick(1);
  }
  trk = trk.tick(48);
  for (i = 0; i < T; i++) {
    trk = trk.pitchBendF((Math.cos(i * Math.PI / T) + 1) / 2).tick(1);
  }
  trk = trk.tick(96).noteOff(60);
  return trk;
}
