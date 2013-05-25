function Game(container)
{
	this.rdr = new GLRenderer;
	if(!this.rdr || this.rdr.unsupported)
	{
		return;
	}

	// Create the Scene.
	this.scene = new Scene(this.rdr.gl);

	// Create the Camera.
	this.cam = new Camera();

	// Put Game in Container element.
	container.appendChild(this.rdr.element);
	this.updateSize();

	this.mouse = { x: 0, y: 0, over: true, down: false };
	this.keyb = new Keyboard;
	
	for(i in gModelData)
	{
		this.scene.addModel(new Model(gModelData[i], this.rdr.gl));
	}
	
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
	var moveSpeed = 0.5;
	var moveDir = vec3.create();
	if(this.keyb.key[KEYMAP.up] || this.keyb.key[KEYMAP.w])
	{
		moveDir[2] += moveSpeed;
	}
	if(this.keyb.key[KEYMAP.down] || this.keyb.key[KEYMAP.s])
	{
		moveDir[2] -= moveSpeed;
	}
	if(this.keyb.key[KEYMAP.left] || this.keyb.key[KEYMAP.a])
	{
		moveDir[0] += moveSpeed;
	}
	if(this.keyb.key[KEYMAP.right] || this.keyb.key[KEYMAP.d])
	{
		moveDir[0] -= moveSpeed;
	}
	
	this.cam.move(moveDir);
};












