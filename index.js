var amen = '/sounds/amen.wav';

var deferreds = [BufferHandler.load(amen)];

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

