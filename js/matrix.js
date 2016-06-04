function Matrix(containerId, rows, cols)
{
	var that = this;
	this.containerId = containerId;
	this.rows = rows;
	this.cols = cols;
	this.matrix = $('#' + this.containerId);
	this.angle = 0;
	this.scale = '';

	this.namber = function (row, col)
	{
		return (col + ((row - 1) * 20) - 1);
	}

	/******************* создание матрицы *********************/
	this.create = function ()
	{
		var matrix = document.getElementById(this.containerId);
		var n =  this.rows * this.cols;

		for (var i = 0; i < n; i++)
		{
			var div = document.createElement('div');
			div.className = 'cell';
			matrix.appendChild(div);
		}
	}
	/*^^^^^^^^^^^^^^^^^^ создание матрицы ^^^^^^^^^^^^^^^^^^^^*/



	/******************* Обнуление матрицы *********************/
	this.clean = function ()
	{
		this.matrix.find("div[class != 'cell']").attr('class', 'cell').html('');
	}
	/*^^^^^^^^^^^^^^^^^^ Обнуление матрицы ^^^^^^^^^^^^^^^^^^^^*/



	/******************* Чтение ячейки матрицы *********************/
	this.getCell = function (row, col)
	{
		return (document.getElementById(this.containerId).
				children[this.namber(row, col)].
				className);
	}
	/*^^^^^^^^^^^^^^^^^^ Чтение ячейки матрицы ^^^^^^^^^^^^^^^^^^^^*/



	/******************* Установка ячейки матрицы *********************/
	this.setCell = function (row, col, val)
	{
		var cell = this.matrix.find('div').eq(this.namber(row, col));
		var val = val || 'cell';
		var imgClass = 'img_' + val;
		var imgSrc = 'img/';

		switch(val)
		{
			case 'head':
				cell.html('<img id="head" src="img/head.gif" style="transform: '
				 + this.scale + ' rotate(' + this.angle + 'deg);">');
				setClass();
				return;
			break;
			case 'snake_body':
				cell.html('');
				setClass();
				return;
			break;
			case 'nut':
				imgSrc += 'nut.png';
			break;
			case 'apple':
				imgSrc += 'apple.png';
			break;
			case 'strawberry':
				imgSrc += 'strawberry.png';
			break;
			case 'lemon':
				imgSrc += 'lemon.png';
			break;
			case 'bank':
				imgSrc += 'bank.gif';
			break;
			case 'meat':
				imgSrc += 'meat.png';
			break;
			default:
				setClass();
				return;
		}
		
		cell.html('<img class="'+ imgClass +'" src="'+ imgSrc +'">');
		cell.find('.'+ imgClass).animate({opacity: 1, height: '21', width: '21'}, 300);
		cell.find('.'+ imgClass).css('box-shadow', 'none');
		setTimeout(function(){cell.append('<img class="shadow" src="img/shadow.png">');}, 250);
		setClass();

		function setClass()
		{
			cell.attr('class', val);
		}
	}
	/*^^^^^^^^^^^^^^^^^^ Установка ячейки матрицы ^^^^^^^^^^^^^^^^^^^^*/



	/******************* Отгрызание хвоста *********************/
	this.tail = function()
	{
		var tail = this.matrix.find('.red');
		this.i = 0;
		var that = this;

		Red();

		function Fade(){
			tail.fadeTo(50, 1);
			that.i++
			setTimeout(Red, 100);
		}
		function Red(){
			if (that.i > 7){
				tail.attr('class', 'cell');
				return;
			}
			tail.fadeTo(50, 0);
			that.i++
			setTimeout(Fade, 100);
		}
	}
	/*^^^^^^^^^^^^^^^^^^ Отгрызание хвоста ^^^^^^^^^^^^^^^^^^^^*/
}