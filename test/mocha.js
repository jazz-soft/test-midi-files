const assert = require('assert');
//const fs = require('fs');
const JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);
const TMF = require('..');

var smf1 = new JZZ.MIDI.SMF(0, 96);
var smf2 = new JZZ.MIDI.SMF(1, 24, 16);
var trk = new JZZ.MIDI.SMF.MTrk();
var junk = new JZZ.MIDI.SMF.Chunk('JUNK', 'junk');
var syx = new JZZ.MIDI.SYX();
var clip = new JZZ.MIDI.Clip();
smf1.push(trk);
smf1.push(junk);
smf2.push(trk);
trk.noteOn(0, 'C6', 127).tick(96).noteOff(0, 'C6');
syx.sxIdRequest();
clip.noteOn(0, 0, 'C6', 127).tick(96).noteOff(0, 0, 'C6');

describe('smf', function() {
  it('print', function() {
    process.argv[2] = 'print';
    TMF.play(smf1);
  });
  it('inspect', function() {
    process.argv[2] = 'inspect';
    TMF.play(smf1);
    TMF.play(smf2);
  });
  it('base64', function() {
    process.argv[2] = 'base64';
    TMF.play(smf1);
    TMF.play(smf1.dump());
  });
  it('null', function() {
    process.argv[2] = 'null';
    TMF.play(smf1);
    TMF.play(smf1.dump());
  });
});

describe('syx', function() {
  it('print', function() {
    process.argv[2] = 'print';
    TMF.play(syx);
  });
  it('inspect', function() {
    process.argv[2] = 'inspect';
    TMF.play(syx);
  });
  it('base64', function() {
    process.argv[2] = 'base64';
    TMF.play(syx);
  });
});

describe('clip', function() {
  it('print', function() {
    process.argv[2] = 'print';
    TMF.play(clip);
  });
  it('inspect', function() {
    process.argv[2] = 'inspect';
    TMF.play(clip);
  });
  it('base64', function() {
    process.argv[2] = 'base64';
    TMF.play(clip);
  });
});

describe('errors', function() {
  it('print', function() {
    process.argv[2] = 'print';
    TMF.play();
    TMF.play('dummy');
  });
});
