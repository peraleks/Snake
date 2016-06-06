APP.namespace('Matrix');

APP.Matrix = function (containerId, rows, cols) {

    this.containerId = containerId;
    this.rows = rows;
    this.cols = cols;
    this.matrix = $('#' + this.containerId);
    this.angle = 0;
    this.scale = '';

	/**
	 * Вычисляет порядковый номер элемента div матрицы
	 *
	 * @param row    - строка
	 * @param col    - столбец
	 * @returns {number} - номер элемента
	 */
	this.namber = function (row, col)
	{
		return (col + ((row - 1) * 20) - 1);
	}

	/**
	 * Создает матрицу
	 */
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


	/**
	 * Обнуляет матрицу
	 */
	this.clean = function ()
	{
		this.matrix.find("div[class != 'cell']").attr('class', 'cell').html('');
	}


	/**
	 * Чтение ячейки матрицы
	 * 
	 * @param row		- строка
	 * @param col		- столбец
	 * @returns {string} - css класс
     */
	this.getCell = function (row, col)
	{
		return (document.getElementById(this.containerId).
				children[this.namber(row, col)].
				className);
	}


	/**
	 * Изменение ячейки матрицы
	 * 
	 * @param row	- строка
	 * @param col	- столбец
	 * @param val	- css класс
     */
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

		/**
		 * Назначает css класс
		 */
		function setClass()
		{
			cell.attr('class', val);
		}
	}


	/**
	 * Реализует отгрызание хвоста
	 */
	this.tail = function()
	{
		var tail = this.matrix.find('.red');
		this.i = 0;
		var self = this;

		Red();

		function Fade(){
			tail.fadeTo(50, 1);
			self.i++;
			setTimeout(Red, 100);
		}
		function Red(){
			if (self.i > 7){
				tail.attr('class', 'cell');
				return;
			}
			tail.fadeTo(50, 0);
			self.i++;
			setTimeout(Fade, 100);
		}
	}
};