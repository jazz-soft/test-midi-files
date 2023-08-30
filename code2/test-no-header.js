var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var clip = new TEST.RawClip();
clip
  .umpDelta(0)
  .umpStartClip()
  .umpDelta(0)
  .umpEndClip()

TEST.write(clip);
TEST.play(clip);
