function clamp(x, a, b)
{
	return Math.min(b,Math.max(a,x));
}

function sqr(x)
{
	return (x*x);
}

function lenSqr(x,y)
{
	return (x*x)+(y*y);
}

function len(x,y)
{
	return Math.sqrt((x*x)+(y*y));
}

function rnd(a,b)
{
	return a + ((b-a)*Math.random());
}

var RAD_TO_DEG_SCALAR = 180/Math.PI;
var DEG_TO_RAD_SCALAR = Math.PI/180;

function r2d(rad)
{
	return rad*RAD_TO_DEG_SCALAR;
}

function d2r(deg)
{
	return deg*DEG_TO_RAD_SCALAR;
}
