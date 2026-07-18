var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);

var notes = ['C5', 'E5', 'G5', 'C6'];
var tempo = 100;

trk = trk.smfSeqName('SMF0 with Tempo Events')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Tempo starts at 100 BPM and increases by 20 BPM after each C major arpeggio loop.');

for (var loop = 0; loop < 4; loop++) {
  trk = trk.smfText('Loop ' + (loop + 1) + ' at ' + tempo + ' BPM')
    .smfBPM(tempo)
    .noteOn(0, notes[0], 127).tick(96).noteOff(0, notes[0])
    .noteOn(0, notes[1], 127).tick(96).noteOff(0, notes[1])
    .noteOn(0, notes[2], 127).tick(96).noteOff(0, notes[2])
    .noteOn(0, notes[3], 127).tick(96).noteOff(0, notes[3]);
  tempo += 20;
}

TEST.write(smf);
TEST.play(smf);