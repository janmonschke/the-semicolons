var amen = '/sounds/amen.wav';
var heli = '/sounds/helicopter.mp3';
var horn = '/sounds/air-horn.mp3';

var lyrics = [
  [12, "We are the Rejects"],
  [24, "We are the Rejects!!!"],
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

  function out(text) {
    $REPL.prepend($('<pre>&nbsp;&nbsp;' + text + '</pre>'));
    $INPUT.val("").focus();
  }

  $('#repl-input').on('keypress', function(e) {
    if (e.which == 13) {
      try {
        line = $INPUT.val();
        if(line[line.length - 1] !== ';') {
          out("Missing Semicolon!");
          return;
        }
        ret_val = eval($INPUT.val());
        out(ret_val);
      } catch (e) {
        console.log(e);
        out(e);
      }
    }
  });
  $('#repl-input').val("").focus();
}

