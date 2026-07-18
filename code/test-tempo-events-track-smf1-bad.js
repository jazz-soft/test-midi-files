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

trk0 = trk0.smfSeqName('SMF1 Tempo Track')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Inconsistent simultaneous tempo events in more than one track (bad).');

trk1 = trk1.smfText('Notes of the C major arpeggio').ch(0);

// Tempo events occurring simultaneously in more than one track.
// It is unspecified how this should be handled and sequencers may handle this differently:
// * Track 0 is the recommended track for tempo events.
// * Track 1 will often be processed after track 0, which may mean that the tempo events in track 1 will be the ones that apply.
// The tempo values in this sequence are chosen so that the interpretation agrees with the other tempo tests when the second policy applies.
for (var loop = 0; loop < 4; loop++) {
  if (loop > 0) {
    trk0 = trk0.tick(loopTicks)
  }
  trk0 = trk0.smfBPM(tempo - 30);
  trk1 = trk1.smfText('Loop ' + (loop + 1) + ' at ' + (tempo - 30) + ' BPM or ' + tempo + ' BPM').smfBPM(tempo);
  trk1 = trk1
    .noteOn(notes[0], 127).tick(96).noteOff(notes[0])
    .noteOn(notes[1], 127).tick(96).noteOff(notes[1])
    .noteOn(notes[2], 127).tick(96).noteOff(notes[2])
    .noteOn(notes[3], 127).tick(96).noteOff(notes[3]);
  tempo += 20;
}

TEST.write(smf);
TEST.play(smf);