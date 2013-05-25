function Camera()
{
	this.ar = 45;
	this.near = 0.001;
	this.far = 10000;
	this.fov = 45;
	this.proj = mat4.create();
	this.tm = mat4.create();
	mat4.identity(this.tm); // Set to identity
	mat4.translate(this.tm, [0, 0, 100]); // Translate fwd 10 units
}

Camera.prototype.updateProjection = function(gl)
{
	mat4.perspective(this.fov, this.ar, this.near, this.far, this.proj);
	//gl.uniformMatrix4fv(perspectiveUniform, false, this.proj);
};

Camera.prototype.move = function(dir)
{
	vec3.negate(dir);
	var rot = mat4.create();
	mat4.toRotationMat(this.tm, rot);
	mat4.multiplyVec3(rot, dir);
	mat4.translate(this.tm, dir);
};


