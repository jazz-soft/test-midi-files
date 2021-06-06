var fs = require('fs');
var path = require('path');
var JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);

if (module.parent) {
  module.exports.play = function(smf) {
    if (!(smf instanceof JZZ.MIDI.SMF)) {
      try {
        smf = new JZZ.MIDI.SMF(smf);
      }
      catch(err) {
        console.error('Error:', err.message);
        return;
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
    else {
      try {
        new JZZ.MIDI.SYX(data);
        ext = '.syx';
      }
      catch(err) {}
      try {
        new JZZ.MIDI.SMF(data);
      }
      catch(err) {
        console.error('Error:', err.message);
        return;
      }
    }
    if (typeof name == 'undefined') {
      name = path.basename(process.argv[1]);
      name = name.split('.').slice(0, -1).join('.');
      name = path.join(__dirname, 'midi', name + ext);
    }
    console.log('Writing ' + name + ' ...');
    fs.writeFileSync(name, data, 'binary');
  }
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
      smf = new JZZ.MIDI.SYX(data);
    }
    catch(err) {}
    try {
      if (!smf) smf = new JZZ.MIDI.SMF(data);
    }
    catch(err) {
      console.error('Error:', err.message);
      process.exit(-1);
    }
    play(smf, process.argv[3]);
  }
}

function usage(node, self) {
  console.log('USAGE:')
  console.log('    node ' + self + ' <filename.mid> [<midi-out port> | print]');
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
  var player = smf.player();
  if (smf.validate) {
    var warn = smf.validate();
    if (warn) for (var i = 0; i < warn.length; i++) console.log('WARNING: ' + warn[i]);
  }
  if (out == 'print') {
    console.log(smf.toString());
    return;
  }
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
