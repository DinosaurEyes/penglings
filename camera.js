var YAW_WRAP = Math.PI*2;
var MAX_PITCH = d2r(80);
var MIN_PITCH = d2r(-80);

function Camera()
{
	this.pos = vec3.create();
	this.pitch = 0;
	this.yaw = 0;
	this.ar = 45;
	this.near = 0.001;
	this.far = 10000;
	this.fov = 45;
	this.proj = mat4.create();
	this.tm = mat4.create();
	mat4.identity(this.tm); // Set to identity
	mat4.translate(this.tm, [0, 0, 100]); // Translate fwd 10 units
   	this.tmToPos();
}

Camera.prototype.updateProjection = function(gl)
{
	mat4.perspective(this.fov, this.ar, this.near, this.far, this.proj);
};

Camera.prototype.posToTM = function()
{
    this.tm[12] = this.pos[0];
    this.tm[13] = this.pos[1];
    this.tm[14] = this.pos[2];
};

Camera.prototype.tmToPos = function()
{
    this.pos[0] = this.tm[12];
    this.pos[1] = this.tm[13];
    this.pos[2] = this.tm[14];
};

Camera.prototype.move = function(localDir)
{
    if(localDir[0]!=0 || localDir[1]!=0 || localDir[2]!=0)
    {
    	mat4.multiplyVec3(this.tm, localDir);
    	vec3.set(localDir, this.pos);
    	this.posToTM();
        document.getElementById("debug_text").innerHTML = this.toString();
    }
};

Camera.prototype.rotate = function(yaw, pitch)
{
    if(yaw!=0 || pitch!=0)
    {
        yaw += this.yaw;
        if(yaw>YAW_WRAP)
        {
            yaw-=YAW_WRAP;
        }
        else if(yaw<0)
        {
            yaw+=YAW_WRAP;
        }
        this.yaw = yaw;
        this.pitch = clamp(this.pitch+pitch, MIN_PITCH, MAX_PITCH);
        var cosPitch = Math.cos(this.pitch),
            side = vec3.create(),
            up = [0,1,0],
            dir = [Math.sin(this.yaw)*cosPitch, Math.sin(this.pitch), Math.cos(this.yaw)*cosPitch ],
            lookat = vec3.create();
        vec3.cross(up, dir, side);
        vec3.cross(dir, side, up);
        
        // Apply Rotation
    	this.tm[0] = side[0];
    	this.tm[1] = side[1];
    	this.tm[2] = side[2];
    	this.tm[3] = 0;
    	this.tm[4] = up[0];
    	this.tm[5] = up[1];
    	this.tm[6] = up[2];
    	this.tm[7] = 0;
    	this.tm[8] = dir[0];
    	this.tm[9] = dir[1];
    	this.tm[10]= dir[2];
    	this.tm[11]= 0;
	    document.getElementById("debug_text").innerHTML = this.toString();
    }
};

Camera.prototype.toString = function()
{
    
    return "Pos: ["+this.pos[0].toFixed(2)+", "+this.pos[1].toFixed(2)+", "+this.pos[2].toFixed(2)+"]<br/>"+
           "Dir: ["+this.tm[8].toFixed(2)+", "+this.tm[9].toFixed(2)+", "+this.tm[10].toFixed(2)+"]<br/>";
}
