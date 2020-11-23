# test-midi-files
A framework for producing test MIDI files

See also:
- [**midi-test**](https://github.com/jazz-soft/midi-test),
- [**web-midi-test**](https://github.com/jazz-soft/web-midi-test),
- [**official MIDI specifications**](https://www.midi.org/specifications)

## Before use
Please run `npm install` to make sure all dependencies are up to date.

## Playing/viewing MIDI files
`node index.js <filename.mid> [<midi-out port> | print]`

e.g.:  
`node index.js midi/test-c-major-scale.mid`  
-- play MIDI file to the default MIDI-Out port.  
`node index.js midi/test-c-major-scale.mid "Microsoft GS Wavetable Synth"`  
-- play MIDI file to the specified MIDI-Out port.  
`node index.js midi/test-c-major-scale.mid print`  
-- print MIDI file contents.

## Playing MIDI files in browser
Open `index.html`

## Creating your own test
Copy `code/test-c-major-scale.js` or your favorite test in the `code` directory.  
Make changes using the API documented at https://jazz-soft.net/doc/JZZ/midifile.html to suit your test case.  
Run `node code/your-test-name.js`, it will create a MIDI file with the same name in the `midi` directory.

If you believe your test will be useful for others, please don't hesitate to check it into this repository.

## Work in progress... More stuff to come!
