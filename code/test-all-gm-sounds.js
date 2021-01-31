var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);
require('jzz-midi-gm')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk = trk.smfSeqName('All GM1 Sounds')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Playing all General MIDI 1 sounds.\n')
  .ch(0);

for (var n = 0; n < 128; n++) {
  trk = trk.smfText((n < 10 ? '00' : n < 100 ? '0' : '') + n + ' ' + JZZ.MIDI.groupName(n) + ': ' + JZZ.MIDI.programName(n))
    .program(n)
    .noteOn('C5', 127).tick(96)
    .noteOn('E5', 127).tick(96)
    .noteOn('G5', 127).tick(96)
    .noteOn('C6', 127).tick(240)
    .noteOff('C5').noteOff('E5').noteOff('G5').noteOff('C6');
}

trk.smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
