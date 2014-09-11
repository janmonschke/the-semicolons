var amen = '/sounds/amen.wav';

var deferreds = [BufferHandler.load(amen)];

$.when.apply($, deferreds).done(function(){
  console.log('READY FOR TAKEOFF!');
});

window.funkyDrums = function(){
  BufferHandler.play(amen);
};