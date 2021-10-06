var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('GS Drum Part Change Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Changing the drum channel on GS-compatible synths.\n')
  .sxGS()
  .sxGS(0x40, 0x11, 0x15, 0x02)
  .smfText('If your synth supports GS you must hear drum playing on channel 0')
  .ch(0)
  .noteOn('C4', 127).tick(96).noteOff('C4')
  .noteOn('E4', 127).tick(96).noteOff('E4')
  .noteOn('G4', 127).tick(96).noteOff('G4')
  .noteOn('C5', 127).tick(96).noteOff('C5').tick(192)
  .sxGS(0x40, 0x10, 0x15, 0x00)
  .smfText('If your synth supports GS you must hear piano playing on channel 9')
  .ch(9)
  .noteOn('C4', 127).tick(96).noteOff('C4')
  .noteOn('E4', 127).tick(96).noteOff('E4')
  .noteOn('G4', 127).tick(96).noteOff('G4')
  .noteOn('C5', 127).tick(96).noteOff('C5').tick(192)
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
