function Loader(gl, audio)
{
    // Contexts
    this.glContext = gl;
    this.audioContext = audio;

    // Data storage
	this.models = new Object();
	this.sounds = new Object();
}

Loader.prototype.loadModel = function(model)
{
	this.models[model.modelType] = model;
};

Loader.prototype.loadSound = function(name, url)
{
    var loader = this;
    loader.sounds[name] = null;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    
    // Decode asynchronously
    request.onload = function()
    {
        loader.audioContext.decodeAudioData(
            request.response,
            function(buffer)
            {
                loader.sounds[name] = buffer;
            },
            function()
            {
                alert("Failed to load audio sample");
            });
    }
    request.send();
}
