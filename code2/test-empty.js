var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var clip = new TEST.RawClip();

TEST.write(clip);
TEST.play(clip);
