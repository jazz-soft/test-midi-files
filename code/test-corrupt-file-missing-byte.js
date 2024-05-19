var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Corrupt File: Mising Byte')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This file is missing the last byte. Some players may refuse to open it.\n')
  .smfText('You must hear a C-Major scale.')
  .noteOn(0, 'C5', 127).tick(96).noteOff(0, 'C5')
  .noteOn(0, 'D5', 127).tick(96).noteOff(0, 'D5')
  .noteOn(0, 'E5', 127).tick(96).noteOff(0, 'E5')
  .noteOn(0, 'F5', 127).tick(96).noteOff(0, 'F5')
  .noteOn(0, 'G5', 127).tick(96).noteOff(0, 'G5')
  .noteOn(0, 'A5', 127).tick(96).noteOff(0, 'A5')
  .noteOn(0, 'B5', 127).tick(96).noteOff(0, 'B5')
  .noteOn(0, 'C6', 127).tick(96).noteOff(0, 'C6')
  .smfText('Thank you!');

var data = smf.dump();
data = data.substring(0, data.length - 1);

TEST.write(data);
TEST.play(data);
