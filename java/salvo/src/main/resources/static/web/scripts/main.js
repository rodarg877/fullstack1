function general() {
	var positions;
	var isStatic;
	if (Ships.length > 1) {
		isStatic = false;
	} else {
		isStatic = true
	}
	$(() => loadGrid())
	$(() => loadGrid2())
	var loadGrid;
	const createGrid = function (size, element, id) {
		let wrapper = document.createElement('DIV')
		wrapper.classList.add('grid-wrapper')

		for (let i = 0; i < size; i++) {
			let row = document.createElement('DIV')
			row.classList.add('grid-row')
			row.id = `${id}-grid-row${i}`

			wrapper.appendChild(row)

			for (let j = 0; j < size; j++) {
				let cell = document.createElement('DIV')
				cell.classList.add('grid-cell')
				if (i > 0 && j > 0) {
					cell.id = `${id}${i - 1}${j - 1}`
				}
				if (j === 0 && i > 0) {
					let textNode = document.createElement('SPAN')
					textNode.innerText = String.fromCharCode(i + 64)
					cell.appendChild(textNode)
				}
				if (i === 0 && j > 0) {
					let textNode = document.createElement('SPAN')
					textNode.innerText = j
					cell.appendChild(textNode)
				}
				row.appendChild(cell)
			}
		}

		element.append(wrapper)
	}
	if (isStatic) {
		$("#salv").hide();
		loadGrid = function () {
			var options = {

				width: 10,
				height: 10,
				verticalMargin: 0,
				cellHeight: 45,
				disableResize: true,
				float: true,
				disableOneColumnMode: true,
				staticGrid: false,
				animate: true
			}
			$('.grid-stack').gridstack(options);
			grid = $('#grid').data('gridstack');

			grid.addWidget($('<div id="patrol_boat"><div class="grid-stack-item-content patrol_boatHorizontal"></div><div/>'),
				0, 1, 2, 1);

			grid.addWidget($('<div id="carrier"><div class="grid-stack-item-content carrierHorizontal"></div><div/>'),
				1, 5, 5, 1);

			grid.addWidget($('<div id="battleship"><div class="grid-stack-item-content battleshipHorizontal"></div><div/>'),
				3, 1, 4, 1);

			grid.addWidget($('<div id="submarine"><div class="grid-stack-item-content submarineVertical"></div><div/>'),
				8, 2, 1, 3);

			grid.addWidget($('<div id="destroyer"><div class="grid-stack-item-content destroyerHorizontal"></div><div/>'),
				7, 8, 3, 1);


			createGrid(11, $(".grid-ships"), 'ships')

			rotateShips("battleship", 4)
			rotateShips("submarine", 3)
			rotateShips("destroyer", 3)
			rotateShips("patrol_boat", 2)

			listenBusyCells('ships')
			$('.grid-stack').on('change', () => listenBusyCells('ships'))

		}
	} else {
		$("#salv").show();
		loadGrid = function () {
			var options = {

				width: 10,
				height: 10,
				verticalMargin: 0,
				cellHeight: 45,
				disableResize: true,
				float: true,
				disableOneColumnMode: true,
				staticGrid: true,
				animate: true
			}
			$('.grid-stack').gridstack(options);
			grid = $('#grid').data('gridstack');
			var patrol_boat = Ships.filter(ship => ship.Ship == "patrol_boat");
			var carrier = Ships.filter(ship => ship.Ship == "carrier");
			var battleship = Ships.filter(ship => ship.Ship == "battleship");
			var submarine = Ships.filter(ship => ship.Ship == "submarine");
			var destroyer = Ships.filter(ship => ship.Ship == "destroyer");
			patrol_boat[0].shipLocation.sort();
			carrier[0].shipLocation.sort();
			battleship[0].shipLocation.sort();
			submarine[0].shipLocation.sort();
			destroyer[0].shipLocation.sort();

			function Horizontal(ship) {
				if (ship[0].shipLocation[0][0] == ship[0].shipLocation[1][0]) {
					return ship[0].shipLocation.length;
				} else {
					return 1
				}
			}
			function Vertical(ship) {
				if (ship[0].shipLocation[0][1] == ship[0].shipLocation[1][1]) {
					return ship[0].shipLocation.length;
				} else {
					return 1;
				}
			}
function imgPosition(ship){
if(Horizontal(ship)>Vertical(ship)){
console.log(ship[0].Ship);
$("#"+ship[0].Ship).addClass(ship[0].Ship+"Horizontal")}
else{
$("#"+ship[0].Ship).addClass(ship[0].Ship+"Vertical")
}
}

			grid.addWidget($('<div id="patrol_boat"><div class="grid-stack-item-content "></div><div/>'),
				(patrol_boat[0].shipLocation[0].substring(1) - 1), (patrol_boat[0].shipLocation[0].charCodeAt(0) - 65), Horizontal(patrol_boat), Vertical(patrol_boat));

			grid.addWidget($('<div id="carrier"><div class="grid-stack-item-content "></div><div/>'),
				(carrier[0].shipLocation[0].substring(1) - 1), (carrier[0].shipLocation[0].charCodeAt(0) - 65), Horizontal(carrier), Vertical(carrier));

			grid.addWidget($('<div id="battleship"><div class="grid-stack-item-content "></div><div/>'),
				(battleship[0].shipLocation[0].substring(1) - 1), (battleship[0].shipLocation[0].charCodeAt(0) - 65), Horizontal(battleship), Vertical(battleship));

			grid.addWidget($('<div id="submarine"><div class="grid-stack-item-content "></div><div/>'),
				(submarine[0].shipLocation[0].substring(1) - 1), (submarine[0].shipLocation[0].charCodeAt(0) - 65), Horizontal(submarine), Vertical(submarine));

			grid.addWidget($('<div id="destroyer"><div class="grid-stack-item-content "></div><div/>'),
				(destroyer[0].shipLocation[0].substring(1) - 1), (destroyer[0].shipLocation[0].charCodeAt(0) - 65), Horizontal(destroyer), Vertical(destroyer));
imgPosition(patrol_boat);
imgPosition(destroyer)
imgPosition(submarine)
imgPosition(battleship)
imgPosition(carrier)


			createGrid(11, $(".grid-ships"), 'ships')


			listenBusyCells('ships')
			$('.grid-stack').on('change', () => listenBusyCells('ships'))
		}

		loadGrid2 = function () {
			var options2 = {

				width: 10,
				height: 10,
				verticalMargin: 0,
				cellHeight: 45,
				disableResize: true,
				float: true,
				disableOneColumnMode: true,
				staticGrid: false,
				animate: true
			}
			$('.grid-stack').gridstack(options2);
			grid2 = $('#grid2').data('gridstack');

			grid2.addWidget($('<div id="salvo0"><div class="grid-stack-item-content salvo"></div><div/>'),
				0, 1, 1, 1);
			grid2.addWidget($('<div id="salvo1"><div class="grid-stack-item-content salvo"></div><div/>'),
				0, 2, 1, 1);
			grid2.addWidget($('<div id="salvo2"><div class="grid-stack-item-content salvo"></div><div/>'),
				0, 3, 1, 1);
			grid2.addWidget($('<div id="salvo3"><div class="grid-stack-item-content salvo"></div><div/>'),
                0, 4, 1, 1);
             grid2.addWidget($('<div id="salvo4"><div class="grid-stack-item-content salvo"></div><div/>'),
                0, 5, 1, 1);
			createGrid(11, $(".grid-salvoes"), 'salvoes')
			

		}
	}
}
var rotateShips = function (shipType, cells) {

	$(`#${shipType}`).click(function () {
		document.getElementById("alert-text").innerHTML = `Rotaste: ${shipType}`
		console.log($(this))
		let x = +($(this).attr('data-gs-x'))
		let y = +($(this).attr('data-gs-y'))

		if ($(this).children().hasClass(`${shipType}Horizontal`)) {
			if (grid.isAreaEmpty(x, y + 1, 1, cells) || y + cells < 10) {
				if (y + cells - 1 < 10) {
					grid.resize($(this), 1, cells);
					$(this).children().removeClass(`${shipType}Horizontal`);
					$(this).children().addClass(`${shipType}Vertical`);
				} else {
					grid.update($(this), null, 10 - cells)
					grid.resize($(this), 1, cells);
					$(this).children().removeClass(`${shipType}Horizontal`);
					$(this).children().addClass(`${shipType}Vertical`);
				}


			} else {
				document.getElementById("alert-text").innerHTML = "A ship is blocking the way!"
			}

		} else {

			if (x + cells - 1 < 10) {
				grid.resize($(this), cells, 1);
				$(this).children().addClass(`${shipType}Horizontal`);
				$(this).children().removeClass(`${shipType}Vertical`);
			} else {
				grid.update($(this), 10 - cells)
				grid.resize($(this), cells, 1);
				$(this).children().addClass(`${shipType}Horizontal`);
				$(this).children().removeClass(`${shipType}Vertical`);
			}

		}
	});

}
const listenBusyCells = function (id) {
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			if (!grid.isAreaEmpty(i, j)) {
				$(`#${id}${j}${i}`).addClass('busy-cell').removeClass('empty-cell')
			} else {
				$(`#${id}${j}${i}`).removeClass('busy-cell').addClass('empty-cell')
			}
		}
	}
}
function obtenerPosicion(ship) {
	var carrier1 = new Object();
	carrier1["name"] = $("#" + ship).attr('id');
	carrier1["x"] = $("#" + ship).attr('data-gs-x');
	carrier1["y"] = $("#" + ship).attr('data-gs-y');
	carrier1["width"] = $("#" + ship).attr('data-gs-width');
	carrier1["height"] = $("#" + ship).attr('data-gs-height');
	carrier1["positions"] = [];
	if (carrier1.height == 1) {
		for (i = 1; i <= carrier1.width; i++) {
			carrier1.positions.push(String.fromCharCode(parseInt(carrier1.y) + 65) + (parseInt(carrier1.x) + i))
		}
	} else {
		for (i = 0; i < carrier1.height; i++) {
			carrier1.positions.push(String.fromCharCode(parseInt(carrier1.y) + 65 + i) + (parseInt(carrier1.x) + 1))
		}
	}
	var objShip = new Object();
	objShip["ship"] = carrier1.name;
	objShip["shipLocation"] = carrier1.positions;
	return objShip;
}

