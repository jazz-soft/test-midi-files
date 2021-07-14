var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var insert = '\xf8\x00\x90\x3c\x7f';

var sysex = [0xf0];
var subst = '\xf0' + String.fromCharCode(insert.length - 2);
for (var i = 0; i < insert.length - 2; i++) {
  sysex.push(0xf7);
  subst += '\xf7';
}

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Illegal MIDI message: f8')
  .smfCopyright('https://jazz-soft.net')
  .smfText('This file contains illegal MIDI message: f8 (Timing Clock). Most players consider it invalid.\n')
  .smfText('You must hear a C-Major scale.')
  .send(sysex) // placeholder
  .tick(96).noteOff(0, 'C5')
  .noteOn(0, 'D5', 127).tick(96).noteOff(0, 'D5')
  .noteOn(0, 'E5', 127).tick(96).noteOff(0, 'E5')
  .noteOn(0, 'F5', 127).tick(96).noteOff(0, 'F5')
  .noteOn(0, 'G5', 127).tick(96).noteOff(0, 'G5')
  .noteOn(0, 'A5', 127).tick(96).noteOff(0, 'A5')
  .noteOn(0, 'B5', 127).tick(96).noteOff(0, 'B5')
  .noteOn(0, 'C6', 127).tick(96).noteOff(0, 'C6')
  .smfText('Thank you!');

var data = smf.dump();
data = data.replace(subst, insert);

TEST.write(data);
TEST.play(data);
