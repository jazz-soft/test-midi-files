var fs = require('fs');
var path = require('path');
var JZZ = require('jzz');
require('jzz-midi-gm')(JZZ);
require('jzz-midi-smf')(JZZ);

function _error(s) { throw new Error(s); }
var SMF2CLIP = 'SMF2CLIP';
function RawClip(x) { if (typeof x != 'undefined') this.load(x); }
RawClip.prototype = [];
RawClip.prototype.send = function(msg) { this.push(JZZ.UMP(msg)); return this; };
RawClip.prototype.annotate = function() {};
RawClip.prototype.validate = function() {};
RawClip.prototype._complain = function(off, msg) {
  console.log(off, msg);
};
RawClip.prototype.dump = function() {
  var a = [SMF2CLIP];
  for (var i = 0; i < this.length; i++) a.push(this[i].dump());
  return a.join('');
};
RawClip.prototype.load = function(s) {
  var off = 0;
  if (!s.length) _error('Empty file');
  if (s.substr(0, 8) != SMF2CLIP) {
    var z = s.indexOf(SMF2CLIP);
    if (z != -1) {
      s = s.substr(z);
      this._complain(off, 'Extra leading characters', z);
      off += z;
    }
    else _error('Not a Clip');
  }
  off += 8;
  var a, i, m, t, len;
  while (off < s.length) {
    t = s.charCodeAt(off) >> 4;
    len = [4, 4, 4, 8, 8, 16, 4, 4, 8, 8, 8, 12, 12, 16, 16, 16][t];
    a = [];
    for (i = 0; i < len; i++) a.push(s.charCodeAt(off + i));
    m = JZZ.UMP(a);
    this.push(m);
    off += len;
  }
};
RawClip.prototype.toString = function() {
  var i;
  var a = [SMF2CLIP];
  for (i = 0; i < this.length; i++) a.push('  ' + this[i].tt + ': ' + this[i]);
  return a.join('\n');
};
JZZ.lib.copyMidi2Helpers(RawClip);

if (module.parent) {
  module.exports.play = function(smf) {
    if (smf instanceof JZZ.MIDI.SMF || smf instanceof JZZ.MIDI.SYX || smf instanceof RawClip) smf = smf.dump();
    try {
      smf = new RawClip(smf);
    }
    catch(err) {
      try {
        smf = new JZZ.MIDI.SYX(smf);
      }
      catch(err) {
        try {
          smf = new JZZ.MIDI.SMF(smf);
        }
        catch(err) {
          console.error('Error:', err.message);
          return;
        }
      }
    }
    play(smf, process.argv[2]);
  }
  module.exports.write = function(data, name) {
    var ext = '.mid';
    if (data instanceof JZZ.MIDI.SMF) {
      data = data.dump();
    }
    else if (data instanceof JZZ.MIDI.SYX) {
      data = data.dump();
      ext = '.syx';
    }
    else if (data instanceof RawClip) {
      data = data.dump();
      ext = '.midi2';
    }
    else {
      try {
        new JZZ.MIDI.SYX(data);
        ext = '.syx';
      }
      catch(err) {
        try {
          new JZZ.MIDI.SMF(data);
        }
        catch(err) {
          console.error('Error:', err.message);
          return;
        }
      }
    }
    if (typeof name == 'undefined') {
      name = path.basename(process.argv[1]);
      if (name.toLowerCase().endsWith('.js')) name = name.substr(0, name.length - 3);
      name = path.join(__dirname, ext == '.midi2' ? 'midi2' : 'midi', name + ext);
    }
    console.log('Writing ' + name + ' ...');
    fs.writeFileSync(name, data, 'binary');
  }
  module.exports.RawClip = RawClip;
}
else {
  var data;
  var smf;
  if (process.argv.length < 3) {
    usage(process.argv[0], process.argv[1]);
    process.exit(0);
  }
  else {
    try {
      data = fs.readFileSync(process.argv[2], 'binary');
    }
    catch(err) {
      console.error('Error:', err.message);
      process.exit(-1);
    }
    try {
      smf = new RawClip(data);
    }
    catch(err) {
      try {
        smf = new JZZ.MIDI.SYX(data);
      }
      catch(err) {
        try {
          smf = new JZZ.MIDI.SMF(data);
        }
        catch(err) {
          console.error('Error:', err.message);
          process.exit(-1);
        }
      }
    }
    play(smf, process.argv[3]);
  }
}

function usage(node, self) {
  console.log('USAGE:')
  console.log('    node ' + self + ' <filename.mid> [<midi-out port> | print | inspect]');
  JZZ().or(function() {
    console.log('No ports available...');
  }).and(function() {
    var i;
    var outs = this.info().outputs;
    if (outs.length) {
      console.log('Available ports:');
      for (i = 0; i < outs.length; i++) console.log('    ' + outs[i].name);
    }
    else {
      console.log('No ports available...');
    }
  });
}

function log(msg) {
  if (msg.ff == 1) console.log(msg.dd);
  if (msg.ff == 2) console.log('(' + msg.dd + ')\n');
  if (msg.ff == 3) console.log('\n##### ' + msg.dd + ' #####\n');
}

function play(smf, out) {
  if (out == 'null') return;
  smf.annotate();
  printWarn(smf.validate());
  if (out == 'print') {
    console.log(smf.toString());
    return;
  }
  if (out == 'inspect') {
    console.log(printSMF(smf));
    return;
  }
  if (out == 'base64') {
    console.log(JZZ.lib.toBase64(smf.dump()));
    return;
  }
  var player = smf.player();
  JZZ().or(function() {
    console.error('Cannot start MIDI engine!');
    if (!out) {
      console.log(smf.toString());
    }
  }).and(function() {
    this.openMidiOut(out).or(function() {
      if (!out) {
        console.log(smf.toString());
      }
      else {
        console.error('Cannot open port:', out);
      }
    }).and(function() {
      console.log('MIDI-Out port:', this.name());
      player.connect(this);
      player.connect(log);
      player.onEnd = function() { console.log('\ndone!'); };
      player.play();
    });
  });
}

function printSMF(smf) {
  if (smf instanceof RawClip) return printClip(smf);
  if (smf instanceof JZZ.MIDI.SYX) return printSYX(smf);
  var i;
  var a = [[smf._off, ' SMF:'], [smf._off_type, '   type: ' + smf.type], [smf._off_ntrk, '   tracks: ' + smf.ntrk]];
  if (smf.ppqn) a.push([smf._off_ppqn, '   ppqn: ' + smf.ppqn]);
  else a = a.concat([[smf._off_fps, '   fps: ' + smf.fps], [smf._off_ppf, '   ppf: ' + smf.ppf]]);
  for (i = 0; i < smf.length; i++) a = a.concat(printChunk(smf[i]));
  return format(a);
}

function printClip(syx) {
  return 'coming soon...';
}

function printSYX(syx) {
  var i;
  var a = [[0, ' SYX:']];
  for (i = 0; i < syx.length; i++) a.push([syx[i]._off, '   ' + syx[i].toString()]);
  return format(a);
}

function printChunk(chunk) {
  if (chunk instanceof JZZ.MIDI.SMF.MTrk) return printTrk(chunk);
  return [[chunk._off, ' ' + chunk.type + ': ' + chunk.data.length + ' bytes']];
}

function printTrk(trk) {
  var a = [[trk._off, ' MTrk:']];
  for (var i = 0; i < trk.length; i++) a.push([trk[i]._off, '   ' + trk[i].tt + ': ' + trk[i].toString()]);
  return a;
}

function format(a) {
  var m = a[a.length - 1][0].toString().length;
  for (var i = 0; i < a.length; i++) {
    a[i] = '[' + a[i][0].toString().padStart(m) + ']' + a[i][1];
  }
  return a.join('\n');
}

function printWarn(warn) {
  if (!warn) return;
  var i;
  var bymsg = {};
  for (i = 0; i < warn.length; i++) {
    if (!bymsg[warn[i].msg]) bymsg[warn[i].msg] = [0, 0];
    bymsg[warn[i].msg][0]++;
  }
  for (i = 0; i < warn.length; i++) {
    if (bymsg[warn[i].msg][1] < 10) {
      console.log('WARNING: ' + warn[i]);
      if (bymsg[warn[i].msg][0] > 15) bymsg[warn[i].msg][1]++;
    }
    if (bymsg[warn[i].msg][1] == 10) {
      console.log('         and ' + (bymsg[warn[i].msg][0] - 10) + ' more of "' + warn[i].msg + '" ...');
      bymsg[warn[i].msg][1]++;
    }
  }
}

