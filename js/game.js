function Game()
{
	var self = this;
	this.m = new Matrix('matrix', 20, 20);
	this.m.create();
	this.key = new Key();
	this.start = false;
	var divSnake = $('#snake');
	setTimeout(Begining, 1000);
	this.name = '';
	this.snakeEat = 0;
	this.t = 0;

	function Begining()
	{
		Message('Новая игра');
		self.message = 'game_start';
		self.totalScore = 0;
		self.level = 1;
	}

	function Key()
	{
		this.left = [37, 'стр.Влево'];
		this.up = [38, 'стр.Верх'];
		this.right = [39, 'стр.Вправо'];
		this.down = [40, 'стр.Вниз'];
		this.pause = [32, 'Пробел'];
		this.enter = [13, 'Enter'];
		this.esc = [27, 'Esc'];
	}

	this.messageSwitch = function()
	{
		switch(this.message)
		{
			case 'game_start':
				if (this.name == ''){
					Name();
				}
				else{
					Message();
					this.newGame();
				}
				break;
			case 'pause':
				this.start = true;
				Message();
				this.gameplay();
				break;
		}
	}

	function Name()
	{	
		self.message = 'name';
		Message();
		setTimeout(nameInput, 300);
		function nameInput()
		{
			Message('Ваше имя:<br><input type="text" maxlength="9">')
			var input = divSnake.find('#message input');
			var last_input = '';
			input.focus();
			input.keydown(function(e)
			{

				var event = e || window.event;
				var keycode = event.keyCode || event.which;
				if (keycode == self.key.enter[0]){
					self.name = input.val();
					self.message = 'game_start';
					self.messageSwitch();
				}
			});
		}
	}

		this.Exit = function()
	{
		self.start = false;
		self.message = 'exit';
			Message('Завершить игру?<br><div id="no">Нет</div><div id="yes">Да</div>');
			var no = divSnake.find('#no');
			var yes = divSnake.find('#yes');
			no.click(function(){
				Message();
				self.start = true;
				self.gameplay();
			})
			yes.click(function(){
				Message();
				self.m.clean();
				self.Ajax('set');
				Begining();
			})

	}


	this.newGame = function ()
	{
		self.m.clean();
		switch(self.level)
		{
			case 1:
				self.score_level = 300;
				self.speed = 200;
				self.time = 250;
				fruit(self.m, 'bank', 1);
				fruit(self.m, 'meat', 1);
				fruit(self.m, 'lemon', 1);
				fruit(self.m, 'nut', 1);
				fruit(self.m, 'strawberry', 1);
				fruit(self.m, 'apple', 1);
			break;
			case 2:
				self.score_level = 700;
				self.speed = 200;
				self.time = 400;
				fruit(self.m, 'bank', 2);
				fruit(self.m, 'meat', 2);
				fruit(self.m, 'lemon', 2);
				fruit(self.m, 'nut', 1);
				fruit(self.m, 'strawberry', 1);
				fruit(self.m, 'apple', 1);
			break;
			case 3:
				self.score_level = 1200;
				self.speed = 180;
				self.time = 800;
				fruit(self.m, 'bank', 4);
				fruit(self.m, 'meat', 4);
				fruit(self.m, 'lemon', 2);
				fruit(self.m, 'nut', 2);
				fruit(self.m, 'strawberry', 2);
				fruit(self.m, 'apple', 1);
			break;
			case 4:
				self.score_level = 1000;
				self.speed = 150;
				self.time = 1000;
				fruit(self.m, 'bank', 20);
				fruit(self.m, 'meat', 11);
				fruit(self.m, 'apple', 1);
			break;
			case 5:
				self.score_level = 1200;
				self.speed = 50;
				self.time = 15000;
				fruit(self.m, 'bank', 3);
				fruit(self.m, 'apple', 1);
			break;
		}
		
		self.timePer = self.time/100;
		self.snake = new Snake(self.m, Random(), Random(), 'right');
		self.snake.create();
		self.start = true;
		self.snakeEat = 0;
		self.score = 0;
		Score();
		divSnake.find('#time_c').animate({width: --self.time/self.timePer + '%'}, 300);
		self.gameplay();
	}
	


	
	this.gameplay = function()
	{
		if (self.time < 0)
		{
			// var t;
			Score();
			self.totalScore += self.score;
			self.Ajax('set');
			var ts = self.totalScore;
			self.start = false;
			self.message = 'time';
			Message('Время истекло');
			setTimeout(Message, self.t = 3000);
			setTimeout(function(){Message('Ваш рекорд:<br>' + ts)}, self.t += 300);
			setTimeout(Message, self.t += 3000);
			setTimeout(Begining, self.t += 300);
			return;
		}

		if (self.score >= self.score_level)
		{
			if (self.level == 5)
			{
				self.totalScore += self.score;
				Winner();
				return;
			}
			var t;
			self.totalScore += self.score;
			self.message = 'level';
			Message('Поздравляем!<br>Уровень ' + self.level + ' пройден');
			setTimeout(Message, t = 3000);
			setTimeout(function(){Message('Уровень ' + (++self.level))}, t += 300);
			setTimeout(Message, t += 3000);
			setTimeout(self.newGame, t += 300);
			return;
		}

		if (self.snake.tail)
		{
			Score();
			self.snake.tail = false;
			self.m.tail();
			setTimeout(self.gameplay, 1500);
			return;
		}

		if (self.snake.eated)
		{
			switch(self.snake.eated)
			{
				case 'bank': self.snakeEat += -20;
					break;				
				case 'meat': self.snakeEat += 0;
					break;				
				case 'lemon': self.snakeEat += 3;
					break;				
				case 'nut': self.snakeEat += 7;
					break;				
				case 'strawberry': self.snakeEat += 10;
					break;				
				case 'apple': self.snakeEat += 20;
					break;				
			}

			Score();
			fruit(self.m, self.snake.eated, 1);
			self.snake.eated = false;
		}

		self.snake.move();
		divSnake.find('#time_c').css('width', --self.time/self.timePer + '%');

		if (self.start === true){
			self.timeout = setTimeout(self.gameplay, self.speed);
		}
		if (self.start == 'pause')
		{
			self.message = 'pause';
			Message('Продолжить');
		}
	}


	function Score()
	{
		self.score = (self.snake.body.length - 1) * 10 + self.snakeEat;
		divSnake.find('#score_text').html(self.score);
		divSnake.find('#total_score div').html(self.totalScore + self.score);
		var sc = self.score/(self.score_level/100);
		sc = sc > 100 ? 100 : sc;
		divSnake.find('#score_c').animate({height: sc + '%'}, 300);
	}

	function fruit(matrix, name, item)
	{
		for(var i = 0; i < item; i++)
		{
			do{
			var row = Random();
			var col = Random();
			}
			while (matrix.getCell(row, col) != 'cell');

			matrix.setCell(row, col, name);
		}

	}

	function Random()
	{
		var max = 20;
		var min = 1;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	function Message(text)
	{
		var mes = divSnake.find('#message');
		var i = 250;
		self.messageText = text || self.messageText;
		self.effectGo = true;
		mes.html(self.messageText);
		center();
		mes.slideToggle(i);
		setTimeout(function(){self.effectGo = false}, i + 100);
	}

	function center()
	{
		var mes = divSnake.find('#message');
		mes.css({
			left: (divSnake.find('#matrix').width() - mes.outerWidth())/2,
			top: (divSnake.find('#matrix').height() - mes.outerHeight())/2
		});
	}

	this.Ajax = function(action, val)
	{
		switch(action)
		{
			case 'serch':
				$.post('get.php', {serch: val}, scoreResult, 'json');
			break;

			case 'set':
				$.post('add.php', {name: self.name, score:  self.totalScore},
					function(data, textStatus){
						if (data != ''){
							alert(data + ':' + textStatus);
						}
						else{
							scoreShow();
						}
					}
				);
			break;

			default:
				scoreShow();
		}

		 function scoreShow(){
			$.post('get.php', scoreResult, 'json');
		}

		function scoreResult(json)
		{
			for(var i = 1; i < json.length; i++)
			{
				if(Number(json[i].score) > json[i-1].score)
				{
					for(var k = i; k > 0; k--)
					{
						if(Number(json[k].score) > json[k-1].score)
						{
							var sorter = Object.assign({}, json[k-1]);
							json[k-1] = Object.assign({}, json[k]);
							json[k] = Object.assign({}, sorter);
						}
					}
				}
			}


			var h = '';
			for(var l in json)
			{
				h += '<div class="name">'+
					json[l].name
						+'</div><div class="score">'+ 
					json[l].score
						 +'</div>';
			}

			divSnake.find('#score_mes').html(h);
			center();
			// return;
		}
	}

	function Winner()
	{
		self.start = false;
		Score();
		self.Ajax('set');

		for(i = 0; i < 380; i++)
		{
			setTimeout(function(){fruit(self.m, 'apple', 1);}, i * 100);
		}
		setTimeout(function(){
			Message(self.name +',<br>вы победили!<br>Ваш рекорд:<br>'+ self.totalScore);
		}, 5000);

		setTimeout(Message, 10000);
		setTimeout(Begining, 10300);
	}
}