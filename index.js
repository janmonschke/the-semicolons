var amen = '/sounds/amen.wav';
var heli = '/sounds/helicopter.mp3';
var horn = '/sounds/air-horn.mp3';

var lyrics = [
  [6, "We are the Rejects"],
  [8, "We are the Rejects!!!"],
];

var deferreds = [BufferHandler.load(amen),BufferHandler.load(heli),BufferHandler.load(horn)];

$.when.apply($, deferreds).done(function(){
  console.log('READY FOR TAKEOFF!');
  installRepl();
});

window.funkydrums = function(){
  BufferHandler.play(amen, {loop: true});
  return "ain't it funky."
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


function installRepl() {
  $REPL = $('#repl');
  $INPUT = $('#repl-input');

  function out(command, text, error) {
    if (error) {
      $REPL.prepend($('<pre class="error">&nbsp;&nbsp;' + text + '</pre>'));
    } else {
      $REPL.prepend($('<pre>&nbsp;&nbsp;' + text + '</pre>'));
    }    
    $REPL.prepend($('<pre class="command">&nbsp;&nbsp;' + command + '</pre>'));
    $INPUT.val("").focus();
  }

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

