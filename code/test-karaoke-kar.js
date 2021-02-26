var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var smf = new JZZ.MIDI.SMF(1, 100);
var trk0 = new JZZ.MIDI.SMF.MTrk(); smf.push(trk0); // First track in Type 1 MIDI file is normally used for tempo changes
var trk1 = new JZZ.MIDI.SMF.MTrk(); smf.push(trk1); // This one will be for the karaoke lyrics
var trk2 = new JZZ.MIDI.SMF.MTrk(); smf.push(trk2); // This one will be for the music

trk0.smfSeqName('Karaoke .KAR Test') // The name of the first track serves as the file title
  .smfCopyright('https://jazz-soft.net')
  .smfText('Testing Karaoke in .kar format.\n')
  .smfBPM(90); // Tempo. Normally set at clock 0, but can be also changed later

trk1.smfSeqName('Lyrics') // The names of other tracks don't have any particular meaning
  .smfText('@TMary Was A Little Lame') // Karaoke player will recognize this track by the "@T" tag
  .smfText('\\Ma') // New verse starts with a backslash "\"
  .tick(75).smfText('ry ')
  .tick(25).smfText('was ')
  .tick(50).smfText('a ')
  .tick(50).smfText('lit')
  .tick(50).smfText('tle ')
  .tick(50).smfText('lame,')
  .tick(100).smfText('/Lit') // New line starts with a slash "/"
  .tick(50).smfText('tle ')
  .tick(50).smfText('lame,')
  .tick(100).smfText('/Lit')
  .tick(50).smfText('tle ')
  .tick(50).smfText('lame,')
  .tick(100).smfText('/Ma')
  .tick(75).smfText('ry ')
  .tick(25).smfText('was ')
  .tick(50).smfText('a ')
  .tick(50).smfText('lit')
  .tick(50).smfText('tle ')
  .tick(50).smfText('lame,')
  .tick(50).smfText('/A ')
  .tick(50).smfText('lit')
  .tick(50).smfText('tle ')
  .tick(50).smfText('lame ')
  .tick(50).smfText('was ')
  .tick(50).smfText('she!');

trk2.ch(0) // all subsequent messahes will go to channel 0
  .program(0x0b) // set channel 0 program to vibraphone
  .note('E5', 127, 75)
  .tick(75).note('D5', 127, 25)
  .tick(25).note('C5', 127, 50)
  .tick(50).note('D5', 127, 50)
  .tick(50).note('E5',127, 50)
  .tick(50).note(64, 127, 50)   // can also use numerical values for the notes
  .tick(50).note(0x40, 127, 90)
  .tick(100).note('D5', 127, 50)
  .tick(50).note('D5', 127, 50)
  .tick(50).note('D5', 127, 90)
  .tick(100).note('E5', 127, 50)
  .tick(50).note('G5', 127, 50)
  .tick(50).note('G5', 127, 90)
  .tick(100).note('E5', 127, 75)
  .tick(75).note('D5', 127, 25)
  .tick(25).note('C5', 127, 50)
  .tick(50).note('D5', 127, 50)
  .tick(50).note('E5', 127, 50)
  .tick(50).note('E5', 127, 50)
  .tick(50).note('E5', 127, 50)
  .tick(75).note('E5', 127, 25)
  .tick(25).note('D5', 127, 50)
  .tick(50).note('D5', 127, 50)
  .tick(50).note('E5', 127, 50)
  .tick(50).note('D5', 127, 50)
  .tick(50).note('C5', 127, 190)
  .tick(100).note('E5', 100, 90).note('G5', 100, 90).note('C6', 127, 90)

TEST.write(smf);
TEST.play(smf);
