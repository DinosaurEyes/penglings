var MOVE_SPEED = 0.8,
    ROT_SPEED = 0.02;

function Game(container)
{
	this.rdr = new GLRenderer;
	if(!this.rdr || this.rdr.unsupported)
	{
		return;
	}
	
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audio = new AudioContext();
    
    this.loader = new Loader(this.rdr.gl, this.audio);

	// Create the Scene.
	this.scene = new Scene(this.loader);

	// Create the Camera.
	this.cam = new Camera();

	// Put Game in Container element.
	container.appendChild(this.rdr.element);
	this.updateSize();

	this.mouse = { x: 0, y: 0, over: true, down: false };
	this.keyb = new Keyboard;
	
	// Load Data
	for(i in gModelData)
	{
		this.loader.loadModel(new Model(gModelData[i], this.rdr.gl));
	}
	
	this.loader.loadSound("Pengling", "https://dl.dropboxusercontent.com/u/57833864/Pengling.wav");
	
	
	// Prep Scene.
	for(var i=0; i<1300; i++)
	{
		this.scene.addInstance(new Penguin());
	}
}

Game.prototype.ok = function()
{
	return this.rdr && !this.rdr.unsupported;
};

Game.prototype.updateSize = function()
{
	if(this.ok())
	{
		var container = this.rdr.element.parentElement;
		if(container)
		{
			var w = container.getBoundingClientRect().width, h = container.getBoundingClientRect().height;
			this.rdr.setSize(w,h);
			this.cam.ar = w/h;
			this.cam.updateProjection(this.rdr.gl);
		}
	}
};

Game.prototype.tick = function()
{
	this.update();
	this.rdr.render(this.scene, this.cam);
};

Game.prototype.update = function()
{
	this.scene.update();
	
	// Input.
	var moveDir = vec3.create(),
	    deltaYaw = 0,
	    deltaPitch = 0;
	if(this.keyb.key[KEYMAP.w])
	{
		moveDir[2] -= MOVE_SPEED;
	}
	if(this.keyb.key[KEYMAP.s])
	{
		moveDir[2] += MOVE_SPEED;
	}

	if(this.keyb.key[KEYMAP.up])
	{
	    deltaPitch -= ROT_SPEED;
	}
	if(this.keyb.key[KEYMAP.down])
	{
	    deltaPitch += ROT_SPEED;
	}

	if(this.keyb.key[KEYMAP.a])
	{
		moveDir[0] -= MOVE_SPEED;
	}
	if(this.keyb.key[KEYMAP.d])
	{
		moveDir[0] += MOVE_SPEED;
	}
	
	if(this.keyb.key[KEYMAP.left])
	{
	    deltaYaw += ROT_SPEED;
	}
	if(this.keyb.key[KEYMAP.right])
	{
	    deltaYaw -= ROT_SPEED;
	}
	
	this.cam.move(moveDir);
	this.cam.rotate(deltaYaw, deltaPitch);
};












