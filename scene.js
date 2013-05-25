function Scene(loader)
{
    this.loader = loader;
    
	this.universe = mat4.create();
	mat4.identity(this.universe);

	this.lightPos = vec3.create(100,1000,100);
}

Scene.prototype.addInstance = function(inst)
{
	var model = this.loader.models[inst.modelType];
	if(model)
	{
		model.instances.push(inst);
	}
};

Scene.prototype.rotate = function(angRad)
{
	mat4.rotateY(this.universe, angRad, this.universe);
};

Scene.prototype.update = function()
{
	//this.rotate(0.01);

	var model, inst;
	for(i in this.loader.models)
	{
		model = this.loader.models[i];
		if(model.instances.length>0)
		{
			for(j in model.instances)
			{
				inst = model.instances[j];
				inst.update();
			}
		}
	}
};



