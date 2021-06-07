var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var syx = new JZZ.MIDI.SYX();

syx.sxIdRequest();

TEST.write(syx);
TEST.play(syx);
