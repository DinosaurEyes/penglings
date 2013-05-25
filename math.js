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
