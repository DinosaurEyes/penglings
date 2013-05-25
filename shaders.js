function VS()
{
	var shader =
	[
'attribute vec3 aVertexPos;',
'attribute vec3 aVertexNrm;',
'attribute vec4 aVertexCol;',
'uniform vec3 uLightPos;',
'uniform mat4 uMVPMatrix;',
'varying lowp vec4 vColor;',
'void main(void)',
'{',
'   vec4 worldPos = (uMVPMatrix * vec4(aVertexPos, 1.0));',            
'   vec4 vLightDir = normalize(worldPos-vec4(uLightPos,1));',
'	float intensity = dot(vLightDir, uMVPMatrix * vec4(aVertexNrm,1));',
'	vColor = aVertexCol;//uMVPMatrix * vec4(aVertexNrm,1);//vLightDir;//aVertexCol * intensity;',
'	gl_Position = worldPos;',
'}'
].join('\n');
	return shader;
}

function FS()
{
	var shader =
	[
'varying lowp vec4 vColor;',
'void main(void)',
'{',
'	gl_FragColor = vColor;',
'}'
].join('\n');
	return shader;
}