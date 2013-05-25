function Penguin()
{
	Instance.call(this, "Penguin");
	
	this.rotRate = Math.random();
}

Penguin.prototype = Object.create(Instance.prototype);

Penguin.prototype.update = function()
{
	mat4.rotateY(this.tm, this.rotRate*0.1, this.tm);
}
