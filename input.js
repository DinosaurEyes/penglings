var debugKeyboard = false;

function Keyboard(gl)
{
	this.key = [];
};

var KEYMAP =
{
	w:87, a:65, s:83, d:68,
	up:38, left:37, down:40, right:39
};

Keyboard.prototype.keydown = function(evt)
{
	if(evt.which && evt.which!=0)
	{
		this.key[evt.which] = true;
		if(debugKeyboard)
		{
			console.log("Pressing: "+ evt.keyIdentifier +" Which["+evt.which+"]");
		}
	}
};

Keyboard.prototype.keyup = function(evt)
{
	if(evt.which && evt.which!=0)
	{
		this.key[evt.which] = false;
	}
};

Keyboard.prototype.clearAll = function()
{
	var i, keys=key.length;
	for(i=0; i<keys; i++)
		key[i] = false;
};



getMouseX = function(canvas, e)
{
	if (e.pageX)
	{
		return e.pageX - canvas.offsetLeft;
	}
	else if (e.clientX)
	{
		return e.clientX + document.body.scrollLeft	+ document.documentElement.scrollLeft - canvas.offsetLeft;
	}
}

getMouseY = function(canvas, e)
{
	if (e.pageY)
	{
		return e.pageY - canvas.offsetTop;
	}
	else if (e.clientY)
	{
		return e.clientY + document.body.scrollTop + document.documentElement.scrollTop - canvas.offsetTop;
	}
}




