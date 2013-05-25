function Model(data, gl)
{
	this.modelType = data.name;
	this.instances = [];

	this.vb = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vb);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.verts), gl.STATIC_DRAW);

	// this.cb = gl.createBuffer();
	// gl.bindBuffer(gl.ARRAY_BUFFER, this.cb);
	// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.cols), gl.STATIC_DRAW);
	
	this.ib = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ib);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data.inds), gl.STATIC_DRAW);
	
	this.indCount = data.inds.length;
}

