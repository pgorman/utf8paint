// You might want to customize these:
var columns = 80;
var rows = 40;
var palette = '█▓▒░ ▚.•°▞|-_+=≈≠*#×/\\^v~`{}[]☠ꙮ⛰⛩⛫⚠★▶…'


var codepoint = '█';
var painting = false;
var totalTiles = columns * rows;

// paint changes the contents of the tile/pixel/character.
function paint(t) {
	if (painting) {
		t.innerHTML = codepoint;
	}
}

// setup creates the initial state.
function setup() {
	window.addEventListener('mouseup', () => {
		painting = false;
	}, false);

	// Set up the palette of characters/codepoints.
	var pe = document.getElementById('palette');
	for (let i = 0; i < palette.length; i++) {
		let s = document.createElement('span');
		let c = palette.charAt(i);
		s.textContent = c;
		s.id = 'p' + i.toString();
		s.className = 'codepoint';
		pe.appendChild(s);
	}
	var codepoints = document.querySelectorAll('.codepoint');
	codepoints.forEach(
		function(c) {
			c.addEventListener('mousedown', () => {
				codepoint = c.textContent
				codepoints.forEach(
					function(c) {
						c.style.border = '0';
					}
				)
				c.style.border = '1px solid';
			}, false);
		}
	)

	// Set up the canvas/tiles/grid of characters.
	var canvas = document.getElementById('canvas');
	while (canvas.lastChild) {
		canvas.removeChild(canvas.lastChild);
	}
	{
		let row = 1;
		let column = 1;
		let i = 0;
		while (i < totalTiles) {
			if (i !== 0 && i % columns === 0) {
				let br = document.createElement('br');
				canvas.appendChild(br);
			}
			let t = document.createElement('span');
			t.id = i;
			t.className = 'tile';
			canvas.appendChild(t);
			i++;
		}
	}
	var tiles = document.querySelectorAll('.tile');
	tiles.forEach(
		function(t) {
			t.innerHTML = ' ';
			t.addEventListener('mousedown', () => {
				painting = true;
				paint(t);
			}, false);
			t.addEventListener('mouseenter', () => { paint(t); }, false);
		}
	)

}
