var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('Running status interrupted by SysEx')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Running status is interrupted by SysEx in the middle of the scale.\n')
  .smfText('You must hear a C-Major scale.')
  .noteOn(0, 'C5', 127).tick(96).noteOn(0, 'C5', 0)
  .noteOn(0, 'D5', 127).tick(96).noteOn(0, 'D5', 0)
  .noteOn(0, 'E5', 127).tick(96).noteOn(0, 'E5', 0)
  .noteOn(0, 'F5', 127).tick(96).noteOn(0, 'F5', 0)
  .noteOn(0, 'G5', 127).tick(96).noteOn(0, 'G5', 0)
  .noteOn(0, 'A5', 127).tick(96).noteOn(0, 'A5', 0)
  .noteOn(0, 'B5', 127).tick(96).noteOn(0, 'B5', 0)
  .noteOn(0, 'C6', 127).tick(96).noteOn(0, 'C6', 0)
  .sxIdRequest();

var data = smf.dump();
var len = data.length;

var a = data.substring(0, len - 36); // start
var b = data.substring(len - 36, len - 12); // last 4 notes
var c = data.substring(len - 12, len - 4); // break
var d = data.substring(len - 4); // eof

data = a + c + b + d;

TEST.write(data);
TEST.play(data);
