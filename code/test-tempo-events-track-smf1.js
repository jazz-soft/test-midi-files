var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(1, 96);
var trk0 = new JZZ.MIDI.SMF.MTrk();
var trk1 = new JZZ.MIDI.SMF.MTrk();
smf.push(trk0);
smf.push(trk1);

var notes = ['C5', 'E5', 'G5', 'C6'];
var tempo = 100;
var loopTicks = 96 * notes.length;

trk0 = trk0.smfSeqName('SMF1 with tempo events')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Tempo events in track 0, notes in Track 1.');

trk1 = trk1.smfText('C major arpeggio notes').ch(0);

for (var loop = 0; loop < 4; loop++) {
  if (loop > 0) {
    trk0 = trk0.tick(loopTicks)
  }
  trk0 = trk0.smfText('Loop ' + (loop + 1) + ' at ' + tempo + ' BPM').smfBPM(tempo);
  trk1 = trk1
    .noteOn(notes[0], 127).tick(96).noteOff(notes[0])
    .noteOn(notes[1], 127).tick(96).noteOff(notes[1])
    .noteOn(notes[2], 127).tick(96).noteOff(notes[2])
    .noteOn(notes[3], 127).tick(96).noteOff(notes[3]);
  tempo += 20;
}

TEST.write(smf);
TEST.play(smf);