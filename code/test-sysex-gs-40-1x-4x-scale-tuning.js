var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk.smfSeqName('GS Scale Tuning Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('If your synth supports GS, the pitch of the note should change.')
  .sxGS().ch(0)
  .smfText('-64 cents')
  .sxGS(0x40, 0x11, 0x40, 0x7f)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .smfText('+63 cents')
  .sxGS(0x40, 0x11, 0x40, 0x00)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .smfText('-64 cents')
  .sxGS(0x40, 0x11, 0x40, 0x7f)
  .noteOn('C5', 127).tick(96).noteOff('C5')
  .smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);
