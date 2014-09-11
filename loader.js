window.BufferHandler = {
  context: new AudioContext(),
  cache: {},
  playing: {},

  load: function(url){
    var deferred = $.Deferred();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function(e) {
      this._processArrayBuffer(xhr.response, deferred, url);
    }.bind(this);
    xhr.send();

    return deferred;
  },

  _processArrayBuffer: function(arrayBuffer, deferred, url){
    this.context.decodeAudioData(arrayBuffer, function(buffer) {
      this.cache[url] = buffer;
      // the url will be used as the id
      deferred.resolve(url);
    }.bind(this), function(e) {
      deferred.reject('Error decoding file', e);
    });
  },

  play: function(id, options){
    if(!options) options = {};
    var source = this.context.createBufferSource();
    source.buffer = this.cache[id];
    if(options.loop) source.loop = true;
    source.connect(this.context.destination);

    source.start(0);
    this.playing[id] = source;
  },

  stop: function(id){
    try{
      if(this.playing[id])
        this.playing[id].stop(0);
    }catch(e){
      // boooom
      debugger
      console.log(e)
    }
  }
}