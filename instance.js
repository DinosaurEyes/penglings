function Instance(type)
{
	this.modelType = type
	this.tm = mat4.create();
	mat4.identity(this.tm); // Set to identity
	mat4.translate(this.tm, [rnd(-60,60), rnd(-35,35), rnd(-60,60)]);
}

Instance.prototype.setPos = function(pos)
{
	mat4.translate(this.tm, pos);
}

Instance.prototype.getPos = function(pos)
{
	pos[0] = this.tm[12];
	pos[1] = this.tm[13];
	pos[2] = this.tm[14];
}
