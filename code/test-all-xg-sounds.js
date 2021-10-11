var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);
require('jzz-midi-gm')(JZZ);

var programs = JZZ.MIDI.GM.allXG();

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk = trk.smfSeqName('All XG Sounds')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This test requires an XG-compatible synth.\n')
  .sxXG().ch(0);

for (var i = 0; i < programs.length; i++) {
  var k =programs[i];
  trk = trk.smfText('(' + (i + 1) + ') ' + k[0] + '/' + k[1] + '/' + k[2] + ': ' + JZZ.MIDI.programName(k[0], k[1], k[2]))
    .bank(k[1], k[2]).program(k[0])
    .noteOn('C5', 127).tick(96)
    .noteOn('E5', 127).tick(96)
    .noteOn('G5', 127).tick(96)
    .noteOn('C6', 127).tick(240)
    .noteOff('C5').noteOff('E5').noteOff('G5').noteOff('C6');
}

trk.smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
