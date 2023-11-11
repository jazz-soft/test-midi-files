var TEST = require('..');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

var clip = new JZZ.MIDI.Clip();
clip.header
  .umpClipName(0, 'Text Message Test')
  .umpCopyright(0, 'https:/jazz-soft.net')
  .umpMetadata(0, 'Various MIDI 2.0 text messages');
clip
  .umpMetadata(0, 'Metadata per group')
  .umpCMetadata(0, 0, 'Metadata per channel')
  .tick(96)
  .umpProjectName(1, 'Project Name per group')
  .umpCProjectName(1, 1, 'Project Name per channel')
  .tick(96)
  .umpComposerName(2, 'Composer Name per group')
  .umpCComposerName(2, 2, 'Composer Name per channel')
  .tick(96)
  .umpLyricistName(3, 'Composer Name per group')
  .umpCLyricistName(3, 3, 'Composer Name per channel')
  .tick(96)
  .umpArrangerName(4, 'Arranger Name per group')
  .umpCArrangerName(4, 4, 'Arranger Name per channel')
  .tick(96)
  .umpPublisherName(5, 'Publisher Name per group')
  .umpCPublisherName(5, 5, 'Publisher Name per channel')
  .tick(96)
  .umpPerformerName(6, 'Performer Name per group')
  .umpCPerformerName(6, 6, 'Performer Name per channel')
  .tick(96)
  .umpAccPerformerName(7, 'Accompanying Performer Name per group')
  .umpCAccPerformerName(7, 7, 'AccompanyingPerformer Name per channel')
  .tick(96)
  .umpRecordingDate(8, 'Recording Date per group')
  .umpCRecordingDate(8, 8, 'Recording Date per channel')
  .tick(96)
  .umpRecordingLocation(8, 'Recording Location per group')
  .umpCRecordingLocation(8, 8, 'Recording Location per channel')
  .tick(96)
  .umpText(9, 'Text per group')
  .umpCText(9, 9, 'Text per channel')
  .tick(96)
  .umpLyrics(10, 'Lyrics per group')
  .umpCLyrics(10, 10, 'Lyrics per channel')
  .tick(96)
  .umpLyricsLanguage(11, 'Lyrics Language per group')
  .umpCLyricsLanguage(11, 11, 'Lyrics Language per channel')
  .tick(96)
  .umpRuby(12, 'Ruby per group')
  .umpCRuby(12, 12, 'Ruby per channel')
  .tick(96)
  .umpRubyLanguage(13, 'Ruby Language per group')
  .umpCRubyLanguage(13, 12, 'Ruby Language per channel')
  .tick(96)
  .umpText(9, 'Unicode Text 𝄞 𝄞 𝄞 𝄞 𝄞');

TEST.write(clip);
TEST.play(clip);
