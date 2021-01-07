// You might want to customize these:
var columns = 78;
var rows = 40;
// https://en.wikipedia.org/wiki/List_of_Unicode_characters
var palette = '█▓▒░ .•°|╎╏┆┇-╌╍┄┅_+│─┼┌┘└┐┬├┤┴┃━╋┏┛┗┓┳┣┫┻║═╬╔╝╚╗╦╠╣╩*✳✺=≈≠#×╱╲╳^v⌃⌄~`{}[]⏴⏵⏶⏷☠☢☣ꙮ⚛⚠☆★…☐☒♔♕♖♗♘♙♚♛♜♝♞♟♠♡♢♣♤♥♦♧♨⚀⚁⚂⚃⚄⚅⌁⌂⎺⎻⎼⎽▀▁▂▃▄▅▆▇██▉▊▋▌▍▎▏▐▝▗▘▖▞▙▚▟■□▪▫▤▥▦▧▨▩▲△▶▷▴▵▸▹▼▽▾▿◀◁◂◃◆◇○◍◎●◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◿◣◺◤◸◥◹◦◧◨◩◪◫'


var codepoint = '█';
var painting = false;
var totalTiles = columns * rows;

// paint changes the contents of the tile/pixel/character.
function paint(s) {
	if (painting) {
		s.innerHTML = codepoint;
	}
}

// restore takes user input and draws a new canvas based on that input.
function restore() {
	var input = document.getElementById('restore').value
	var canvas = document.getElementById('canvas');
	var inputRows = 0;
	var spanCount = 0;

	while (canvas.lastChild) {
		canvas.removeChild(canvas.lastChild);
	}

	// Set columns based on longest line, if greater than global columns.
	for (var i = 0, n = 0; i < input.length; i++) {
		let c = input.charAt(i);
		n++;
		if (c === '\n') {
			if (n > columns) {
				columns = n;
			}
			n = 0;
		}
	}

	for (var i = 0, n = 0; i < input.length; i++) {
		let c = input.charAt(i);
		n++;
		if (c === '\n' || i === input.length - 1) {
			if (n > columns) {
				columns = n;
			} else {
				while (n <= columns) {
					let s = document.createElement('span');
					s.className = 'tile';
					s.id = spanCount
					spanCount++
					s.innerHTML = ' ';
					s.addEventListener('mousedown', () => {
						painting = true;
						paint(s);
					}, false);
					s.addEventListener('mouseenter', () => { paint(s); }, false);
					canvas.appendChild(s);
					n++
				}
				n = 0;
			}
			if (i !== input.length - 1) {
				let br = document.createElement('br');
				canvas.appendChild(br);
			}
			inputRows++;
		} else {
			let s = document.createElement('span');
			s.className = 'tile';
			s.id = spanCount
			spanCount++
			s.innerHTML = c;
			s.addEventListener('mousedown', () => {
				painting = true;
				paint(s);
			}, false);
			s.addEventListener('mouseenter', () => { paint(s); }, false);
			canvas.appendChild(s);
		}
	}

	for (; inputRows < rows; inputRows++) {
		let br = document.createElement('br');
		canvas.appendChild(br);
		for (i = 0; i < columns; i++) {
			spanCount++;
			let s = document.createElement('span');
			s.className = 'tile';
			s.id = spanCount
			spanCount++
			s.innerHTML = ' ';
			s.addEventListener('mousedown', () => {
				painting = true;
				paint(s);
			}, false);
			s.addEventListener('mouseenter', () => { paint(s); }, false);
			canvas.appendChild(s);
		}
	}
}

// setchar sets a codepoint with which to paint from user input.
function setchar() {
	codepoint = document.getElementById('char').value
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
			let s = document.createElement('span');
			s.id = i;
			s.className = 'tile';
			canvas.appendChild(s);
			i++;
		}
	}
	var tiles = document.querySelectorAll('.tile');
	tiles.forEach(
		function(s) {
			s.innerHTML = ' ';
			s.addEventListener('mousedown', () => {
				painting = true;
				paint(s);
			}, false);
			s.addEventListener('mouseenter', () => { paint(s); }, false);
		}
	)

}
