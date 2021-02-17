var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);

trk = trk.smfSeqName('Modulation Depth Range Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This test sets various Modulation Depth ranges via the Registered Parameter [0, 5].\n')

trk = trk.ch(0).program(16).rpnModulationDepthRange(0x00, 0x40).smfText('Default Modulation Depth range is half semitone.');
trk = modulate(trk);
trk = trk.tick(96).rpnModulationDepthRange(0x00, 0x20).smfText('Modulation Depth range is set to quarter semitone.');
trk = modulate(trk);
trk = trk.tick(96).rpnModulationDepthRange(0x02, 0x00).smfText('Modulation Depth range is set to a whole tone.');
trk = modulate(trk);
trk = trk.tick(96).rpnModulationDepthRange(0x0c, 0x00).smfText('Modulation Depth range is set to one octave.');
trk = modulate(trk);
trk = trk.tick(96).rpnModulationDepthRange(0x18, 0x00).smfText('Modulation Depth range is set to two octaves.');
trk = modulate(trk);
trk.rpnModulationDepthRange(0x00, 0x40) // back to the default
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);

function modulate(trk) {
  var i;
  var T = 192;
  trk = trk.noteOn(60).tick(96);
  for (i = 0; i < T; i++) {
    trk = trk.modF(Math.sin(Math.PI * i / 2 / T)).tick(1);
  }
  trk = trk.tick(288).modF(0).noteOff(60);
  return trk;
}
