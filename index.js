var heli = '/sounds/helicopter.mp3';
var horn = '/sounds/air-horn.mp3';
var backing_track = '/sounds/backing_track.mp3';

var lyrics = [
  [6, "We are the Rejects"],
  [8, "We are the Rejects!!!"],
];

var deferreds = [BufferHandler.load(heli),BufferHandler.load(horn), BufferHandler.load(backing_track)];

$.when.apply($, deferreds).done(function(){
  console.log('READY FOR TAKEOFF!');

  installRepl();
  out(null, "READY.", false);
});

window.backingtrack = function(callback){
  BufferHandler.play(backing_track, {loop: false});
  if(callback) callback();
  return "Backing Track Started."
};

window.gocrazy = function(){
  $(document.body).addClass('gocracy');
  return "went crazy. happy now?";
};

window.nyan = function(){
  $('#nyan').css('left', '1400px');
  return "Nananananananananananananana nanananana na";
}

window.reset = function(){
  $(document.body).removeClass('gocracy');
  return "went crazy. happy now?";
};

window.helicopter = function(){
  BufferHandler.play(heli);
  return "ROFL";
};

window.helicopter = function(){
  BufferHandler.play(heli);
  return "ROFL";
};

window.siren = function(){
  BufferHandler.play(horn);
  return "MASSIVE!";
};

window.bono = function() {
  $('#itunes-download').show();
  setTimeout(function() {
    $('#itunes-download').hide();
  }, 10000)
  return "*groan*";
}

window.Jed = null;

window.simulate = function() {

}

window.add_cheese = function() {
  return
}

window.displaylyrics = function() {
  lyrics.forEach(function(l) {
    console.log("scheduling: " + l[1] +  "at: " + l[0]);
    setTimeout(displayLine(l[1]), l[0] * 1000);
  });
  return;
}

function displayLine(line) {
  var fun = function() {
    $lyrics = $('#lyrics');
    $lyrics.text(line);
  }
  return fun;
}

var ls = localStorage.getItem('replHistory');
var replHistory = ls ? JSON.parse(ls) : [];
var replIndex = 0;

function installRepl() {
  $REPL = $('#repl');
  $INPUT = $('#repl-input');

  window.out = function(command, text, error) {
    if (error) {
      $REPL.prepend($('<pre class="error">&nbsp;&nbsp;' + text + '</pre>'));
    } else {
      $REPL.prepend($('<pre>&nbsp;&nbsp;' + text + '</pre>'));
    }
    if (command) {
        $REPL.prepend($('<pre class="command">&nbsp;&nbsp;' + command + '</pre>'));
        replIndex = 0;
        replHistory.unshift(command);
        localStorage.setItem('replHistory', JSON.stringify(replHistory));
    }
    $INPUT.val("").focus();
  }

  $('#repl-input').on('keyup', function(e){
    // up
    if(e.which == 38){
      if(replIndex <= replHistory.length - 1){
        var oldCommand = replHistory[replIndex++];
        $('#repl-input').val(oldCommand).focus()
      }
    }else if(e.which == 40){ // DOWN
      if(replIndex >= 0){
        var oldCommand = "";
        if(replIndex == 0)
          var oldCommand = replHistory[replIndex];
        else
          var oldCommand = replHistory[--replIndex];
        $('#repl-input').val(oldCommand).focus()
      }
    }
  });

  $('#repl-input').on('keypress', function(e) {
    if (e.which == 13) {
      try {
        line = $INPUT.val();
        if(line[line.length - 1] !== ';') {
          out(line, "Missing Semicolon!", true);
          return;
        }
        ret_val = eval(line);
        out(line, ret_val, false);
      } catch (e) {
        console.log(e);
        out(line, e, true);
      }
    }
  });
  $('#repl-input').val("").focus();
}

