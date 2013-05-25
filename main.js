var gGame = null;

function initGame(container)
{
	gGame = new Game(container);
	if(gGame.ok())
	{
		gGame.rdr.element.addEventListener("mousemove", function(e){ gGame.mouse.x = getMouseX(this,e); gGame.mouse.y = getMouseY(this,e); }, false);
		gGame.rdr.element.addEventListener("mousedown", function(e){ gGame.mouse.down = true; }, false);
		gGame.rdr.element.addEventListener("mouseup", function(e){ gGame.mouse.down = false; }, false);
		gGame.rdr.element.addEventListener("mouseover", function(e){ gGame.mouse.over = true; }, false);
		gGame.rdr.element.addEventListener("mouseout", function(e){ gGame.mouse.down = false; gGame.mouse.over = false; }, false);
		document.addEventListener("keydown", function(e){ gGame.keyb.keydown(e); }, false);
		document.addEventListener("keyup", function(e){ gGame.keyb.keyup(e); }, false);
		document.addEventListener("blur", function(e){ gGame.keyb.clearAll(); }, false);
		document.addEventListener("focus", function(e){ gGame.keyb.clearAll(); }, false);
		window.onresize = resizeGame;
		tickGame();
	}
}

function tickGame()
{
	if(gGame && gGame.ok())
	{
		window.requestAnimationFrame(tickGame, container);
		gGame.tick();
	}
}

function resizeGame()
{
	if(gGame && gGame.ok())
	{
		gGame.updateSize();
	}
}

