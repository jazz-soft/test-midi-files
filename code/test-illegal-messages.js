var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var bad = '';
bad += '\xf1\x7f'; // f1 xx MIDI Time Code Quarter Frame.
bad += '\x00\xf2\x7f\x7f'; // f2 xx xx Song Position Pointer
bad += '\x00\xf3\x7f'; // f3 xx Song Select
bad += '\x00\xf4'; // f4 Undrfined
bad += '\x00\xf5'; // f5 Undrfined
bad += '\x00\xf6'; // f6 Tune Request
bad += '\x00\xf8'; // f8 Timing Clock
bad += '\x00\xf9'; // f9 Undefined
bad += '\x00\xfa'; // fa Start
bad += '\x00\xfb'; // fb Continue
bad += '\x00\xfc'; // fc Stop
bad += '\x00\xfd'; // fd Undefined
bad += '\x00\xfe'; // fe Active Sensing

var sysex = [0xf0];
var subst = '\xf0' + String.fromCharCode(bad.length - 2);
for (var i = 0; i < bad.length - 2; i++) {
  sysex.push(0xf7);
  subst += '\xf7';
}

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Corrupt File: Extra Byte')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This file contains illegal MIDI messages. Most players consider it invalid.\n')
  .send(sysex) // placeholder
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
data = data.replace(subst, bad);

TEST.write(data);
TEST.play(data);
