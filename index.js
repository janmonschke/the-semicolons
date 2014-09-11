var heli = '/sounds/helicopter.mp3';
var horn = '/sounds/air-horn.mp3';
var backing_track = '/sounds/backing_track.mp3';

var deferreds = [BufferHandler.load(heli),BufferHandler.load(horn), BufferHandler.load(backing_track)];

$.when.apply($, deferreds).done(function(){
  console.log('READY FOR TAKEOFF!');

  installRepl();
  out(null, "READY.", false);
});

window.BackingTrack = {
  start: function(){
    BufferHandler.play(backing_track, {loop: false});
    console.log(displayLyrics); 
    displayLyrics();
    setTimeout(function() {
      $('#notification').addClass('show');
    }, 150 * 1000);
    
    return "Backing Track Started."
  }
};

window.goCrazy = function(){
  $(document.body).addClass('gocracy');
  return "went crazy. happy now?";
};

window.nyan = function(){
  $('#nyan').css('left', '2000px');
  return "Nananananananananananananana nanananana na";
}
window.addCheese = function(){
  $('#cheese').css('left', '2000px');
  return "here. have some cheddar.";
}

window.reset = function(){
  $(document.body).removeClass('gocracy');
  return "went crazy. happy now?";
};

window.helicopter = function(){
  BufferHandler.play(heli);
  return "ROFL";
};

window.siren = function(){
  BufferHandler.play(horn);
  return "MASSIVE!";
};

window.promo = function() {
  $('#itunes-download').show();
  setTimeout(function() {
    $('#itunes-download').hide();
  }, 10000)
  return "*groan*";
}

window.JanM = 'JanM';
window.JanK = 'JanK';
String.prototype.init = function() { return "Voice Initialized."; }
window.Jed = 'Jed Schmidt';
window.Jan = 'Jan';
window.Paul = 'Paul Campbell';
//window.Bono = 'Bono';

window.TheSemicolons = {
  welcome: function() {
    return "Hello World; we are The Semicolons."
  }
}

var jans = ["Jan Krutisch", "Jan Monschke"];

var greetings = {
  "Paul Campbell": "Paul Campbell takes the stage",
  "Jed Schmidt": "J.S. himself, it's Jed Schmidt",
  "Jan Monschke": "You saw him here first last year: Jan Monschke",
  "Jan Krutisch": "Jan Krutisch: Because you can never have too many Jans"
};

window.simulate = function(jed, callback) {
  return "Simulating " + jed + " prepared.";
  if(callback) callback();
}

window.get = function(name) {
  if (name == 'Bono') {
    return;
  }
  if (name == 'Jan') {
    jan = jans.pop();
    if (jan) {
      return greetings[jan];
    } else {
      throw("ERROR::QUOTA_EXCEEDED Too many Jans")
    }
    
  }
  return greetings[name];
}
window.summon = window.get;
window.synthesize = window.get;
window.sznthesiye = window.get;


window.love = function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  var heart = $("<div class='heart'>&lt;3</div>");
  var color = "rgb(" + Math.round(255 * Math.random()) + ", " + Math.round(255 * Math.random()) + "," + Math.round(255 * Math.random()) + ")";  
  heart.css({
    top: Math.random() * height, 
    left: Math.random() * width,
    color: color,
    "font-size": "" + (Math.floor(Math.random() * 20)) + "em",
    "transform": "" + (Math.random() * 360) + "deg"
  });
  $("body").append(heart);
  setTimeout(love, 200 + Math.random() * 200);
}

window.displayLyrics = function() {
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
    $lyrics.addClass('achtung');
    setTimeout(function() {
      $lyrics.removeClass('achtung');
    }, 1000);
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
        line = $INPUT.val().trim();
        if (line === '') {
          $('#repl-input').focus();
          return;
        }
        if(line[line.length - 1] !== ';') {
          out(line, "ERROR: Missing Semicolon!", true);
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

