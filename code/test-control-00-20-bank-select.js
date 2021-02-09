var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Bank Select Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Switching between Percussion and Melody sounds via the Bank Select messages.\n')
  .ch(0)
  .smfText('You must hear Percussion sound on Channel 1...')
  .bank(0x78, 0).program(0)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .noteOn('E5', 127).tick(96).noteOff('E5')
  .noteOn('G5', 127).tick(96).noteOff('G5')
  .noteOn('C6', 127).tick(96).noteOff('C6')
  .bank(0x79, 0).program(0)
  .tick(192)
  .ch(9)
  .bank(0x79, 0).program(0)
  .smfText('You must hear Melody sound on Channel 10...')
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .noteOn('E5', 127).tick(96).noteOff('E5')
  .noteOn('G5', 127).tick(96).noteOff('G5')
  .noteOn('C6', 127).tick(96).noteOff('C6')
  .bank(0x78, 0).program(0)
  .tick(96)
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
