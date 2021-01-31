var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);
require('jzz-midi-gm')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk = trk.smfSeqName('All GM Percussion')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Playing all General MIDI percussion sounds.\n')
  .ch(9);

for (var n = 27; n < 88; n++) {
  trk = trk.smfText(n + ' ' + JZZ.MIDI.percussionName(n) + (n < 35 || n > 81 ? ' (GM2)' : ''))
    .noteOn(n, 127).tick(96)
    .noteOn(n, 127).tick(96)
    .noteOn(n, 127).tick(240);
}

trk.smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
