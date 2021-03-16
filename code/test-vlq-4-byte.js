var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
var tt = 0x0e000000;

smf.push(trk);
trk.tick(tt).smfSeqName('4-Byte VLQ')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This file has 4-byte VLQ delta times. Technically, it\'s a valid MIDI file.\n')
  .smfText('You must hear a C-Major scale.')
  .noteOn(0, 'C5', 127).tick(tt + 96).noteOff(0, 'C5')
  .noteOn(0, 'D5', 127).tick(tt + 96).noteOff(0, 'D5')
  .noteOn(0, 'E5', 127).tick(tt + 96).noteOff(0, 'E5')
  .noteOn(0, 'F5', 127).tick(tt + 96).noteOff(0, 'F5')
  .noteOn(0, 'G5', 127).tick(tt + 96).noteOff(0, 'G5')
  .noteOn(0, 'A5', 127).tick(tt + 96).noteOff(0, 'A5')
  .noteOn(0, 'B5', 127).tick(tt + 96).noteOff(0, 'B5')
  .noteOn(0, 'C6', 127).tick(tt + 96).noteOff(0, 'C6')
  .smfText('Thank you!');

var data = smf.dump();
while (data.indexOf('\xf0\x80\x80') != -1) {
  data = data.replace('\xf0\x80\x80', '\x80\x80\x80');
}

TEST.write(data);
TEST.play(data);
