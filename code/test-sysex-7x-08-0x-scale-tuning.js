var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(0, 96);
var trk = new JZZ.MIDI.SMF.MTrk();
smf.push(trk);
trk = trk.smfSeqName('Scale Tuning Test')
  .smfCopyright('https://jazz-soft.net')
  .smfText('Testing several Scale Tuning SysEx-es.\n')
  .smfText('Please see your instrument MIDI chart to see if these are supported.\n')
  .smfText('No tuning. Your must hear a regular chromatic scale.');
trk = play_scale(trk);

trk = trk.sxScaleTuning1F([.62, -.62, .62, -.62, .62, -.62, .62, -.62, .62, -.62, .62, -.62])
  .smfText('1-byte RT tuning [7F 08 08]. It it works, your must hear a funny scale.');
trk = play_scale(trk).sxScaleTuning1F([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]).tick(96);

trk = trk.sxScaleTuning1F([.62, -.62, .62, -.62, .62, -.62, .62, -.62, .62, -.62, .62, -.62], false)
  .smfText('1-byte non-RT tuning [7E 08 08]. It it works, your must hear a funny scale.');
trk = play_scale(trk).sxScaleTuning1F([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], false).tick(96);

trk = trk.sxScaleTuning2F([.62, -.62, .62, -.62, .62, -.62, .62, -.62, .62, -.62, .62, -.62])
  .smfText('2-byte RT tuning [7F 08 09]. It it works, your must hear a funny scale.');
trk = play_scale(trk).sxScaleTuning2F([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]).tick(96);

trk = trk.sxScaleTuning2F([.62, -.62, .62, -.62, .62, -.62, .62, -.62, .62, -.62, .62, -.62], false)
  .smfText('2-byte non-RT tuning [7E 08 09]. It it works, your must hear a funny scale.');
trk = play_scale(trk).sxScaleTuning2F([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], false).tick(96).smfText('Thank you!');

TEST.write(smf);
TEST.play(smf);

function play_scale(trk) {
  for (var n = 60; n <= 72; n++) trk = trk.note(0, n, 127, 96).tick(96);
  return trk;
}
