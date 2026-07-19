var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(1, 96);
var trk0 = new JZZ.MIDI.SMF.MTrk();
var trk1 = new JZZ.MIDI.SMF.MTrk();
var trk2 = new JZZ.MIDI.SMF.MTrk();
smf.push(trk0);
smf.push(trk1);
smf.push(trk2);

var notes = ['C5', 'E5', 'G5', 'C6'];
var tempo = 100;
var loopTicks = 96 * notes.length;

trk0 = trk0.smfSeqName('SMF1 Tempo Track')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Tempo events not all on track 0 (non-standard).');

trk1 = trk1.smfText('Some notes of the C major arpeggio').ch(0);
trk2 = trk2.smfText('Other notes of the C major arpeggio').ch(0);

// Tempo events are treated globally, so even though the note events are split between two tracks
// the tempo events should affect the timing of the note events consistently.
for (var loop = 0; loop < 4; loop++) {
  trk0 = trk0.smfText('Loop ' + (loop + 1) + ' at ' + tempo + ' BPM');
  if (loop == 1) {
    trk0 = trk0.tick(loopTicks).smfBPM(tempo);
  } else if (loop == 3) {
    trk0 = trk0.tick(loopTicks * 2).smfBPM(tempo);
  } else {
    trk2 = trk2.smfBPM(tempo);
  }
  trk1 = trk1
    .noteOn(notes[0], 127).tick(96).noteOff(notes[0])
    .tick(96).noteOn(notes[2], 127).tick(96).noteOff(notes[2])
    .tick(96);
  trk2 = trk2
    .tick(96).noteOn(notes[1], 127).tick(96).noteOff(notes[1])
    .tick(96).noteOn(notes[3], 127).tick(96).noteOff(notes[3])
  tempo += 20;
}

TEST.write(smf);
TEST.play(smf);