function GLRenderer()
{
  this.element = document.createElement('canvas');
  this.element.style.display = 'block';

  // Set initial vertex and light count
  this.vertCount = null;
  this.lights = null;

  // Create parameters object
  var parameters =
	{
    preserveDrawingBuffer: false,
    premultipliedAlpha: true,
    antialias: true,
    stencil: true,
    alpha: true
  };

  // Create and configure the gl context
	this.gl = this.element.getContext("experimental-webgl", parameters);

  // Set the internal support flag
  this.unsupported = !this.gl;

  // Setup renderer
  if (this.unsupported)
	{
    return 'WebGL is not supported by your browser.';
  }

	this.program = null;
	this.attPos = null;
	this.attNrm = null;
	this.attCol = null;
	this.initShaders();

	this.gl.clearColor(0.392, 0.584, 0.929, 1.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.setSize(this.element.width, this.element.height);
}

GLRenderer.prototype.setSize = function(width, height)
{
  if(this.unsupported) { return; }

  // Set the size of the canvas element
  this.element.width = width;
  this.element.height = height;

  // Set the size of the gl viewport
  this.gl.viewport(0, 0, width, height);
  return this;
};

GLRenderer.prototype.clear = function()
{
  if(this.unsupported) { return; }
	
  this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  return this;
};

GLRenderer.prototype.initShaders = function()
{
	var vscode = VS();
	var fscode = FS();
	var code = vscode + fscode;

	if(!!this.program && this.program.code === code)
		return;
	
	var vs = this.gl.createShader(this.gl.VERTEX_SHADER);
	this.gl.shaderSource(vs, vscode);
	this.gl.compileShader(vs);
	if(!this.gl.getShaderParameter(vs, this.gl.COMPILE_STATUS))
	{
		console.error("An error occurred compiling the vertex shader:\n " + this.gl.getShaderInfoLog(vs));
		return;
	}

	var fs = this.gl.createShader(this.gl.FRAGMENT_SHADER);
	this.gl.shaderSource(fs, fscode);
	this.gl.compileShader(fs);
	if(!this.gl.getShaderParameter(fs, this.gl.COMPILE_STATUS))
	{
		console.error("An error occurred compiling the fragment shader:\n " + this.gl.getShaderInfoLog(fs));
		return;
	}
	
	// Create the shader program
	var program = this.gl.createProgram();
	this.gl.attachShader(program, vs);
	this.gl.attachShader(program, fs);
	this.gl.linkProgram(program);

	// If creating the shader program failed, alert
	if(!this.gl.getProgramParameter(program, this.gl.LINK_STATUS))
	{
		console.error("Unable to initialize the shader program.");
		return;
	}
	
  // Delete the shader
	this.gl.deleteShader(fs);
	this.gl.deleteShader(vs);

	program.code = code;
	
	this.program = program;
	
	this.gl.useProgram(this.program);

	this.attPos = this.gl.getAttribLocation(this.program, "aVertexPos");
	this.gl.enableVertexAttribArray(this.attPos);
	this.attCol = this.gl.getAttribLocation(this.program, "aVertexCol");
	this.gl.enableVertexAttribArray(this.attCol);
	this.attNrm = this.gl.getAttribLocation(this.program, "aVertexNrm");
	this.gl.enableVertexAttribArray(this.attNrm);
}

GLRenderer.prototype.render = function(scene, cam)
{
	// Clear.
	this.clear();

	// Camera Matrix.
	var invCamTM = mat4.create();
	mat4.inverse(cam.tm, invCamTM);

	// Acquire the mvpMatrix for the shader.
	var pModelViewProjMat = this.gl.getUniformLocation(this.program, "uMVPMatrix");

		// Calc Light Dir.
	var vLightPos = vec3.create();
    mat4.multiplyVec3(scene.universe, scene.lightPos, vLightPos);
	var pLightPos = this.gl.getUniformLocation(this.program, "uLightPos");
	this.gl.uniform3fv(pLightPos, vLightPos);

    // Model View Matrix
	var mvm = mat4.create();
	mat4.identity(mvm);
	
	var  model, inst;
	for(i in scene.loader.models)
	{
		model = scene.loader.models[i];
		if(model.instances.length>0)
		{
			var renderVerts = model.indCount;

			// Bind the model.vb to the vPos attribute
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, model.vb);
			this.gl.vertexAttribPointer(this.attPos, 3, this.gl.FLOAT, false, 28, 0);
			this.gl.vertexAttribPointer(this.attNrm, 3, this.gl.FLOAT, false, 28, 0);
			this.gl.vertexAttribPointer(this.attCol, 4, this.gl.FLOAT, false, 28, 12);
			
			// Bind the model.ib
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, model.ib);
			
			for(j in model.instances)
			{
				inst = model.instances[j];
				mat4.multiply(scene.universe, inst.tm, mvm);
				mat4.multiply(invCamTM, mvm, mvm);
				mat4.multiply(cam.proj, mvm, mvm);
				this.gl.uniformMatrix4fv(pModelViewProjMat, false, mvm);
				this.gl.drawElements(this.gl.TRIANGLES, renderVerts, this.gl.UNSIGNED_SHORT, 0);
			}
		}
	}
};
	
	
	