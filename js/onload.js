$(function(){

	$('#accordion').accordion({animate: 300, heightStyle: "fill"});
	var divSnake = $('#snake');
	var game = new Game();
	game.Ajax();

	$('#key_right').html(game.key.right[1]);
	$('#key_left').html(game.key.left[1]);
	$('#key_down').html(game.key.down[1]);
	$('#key_up').html(game.key.up[1]);
	$('#key_pause').html(game.key.pause[1]);
	


	divSnake.find('#message').click(function(){
		if (!game.effectGo){
			game.messageSwitch();
		}
	});

	var lastSerch;
	var ser = divSnake.find('#serch');
	ser.keyup(function(e){

		if(lastSerch == ser.val())
			return false;
		
		game.Ajax('serch', ser.val());
		lastSerch = ser.val();
	});

	window.onkeydown = function(e)
	{
		var event = e || window.event;
		var keycode = event.keyCode || event.which;
		var key = event.key || event.code;

		if (game.start)
		{
			switch(keycode)
			{
				case game.key.left[0]:
					game.snake.direction = 'left';
					break;
				case game.key.up[0]:
					game.snake.direction = 'up';
					break;
				case game.key.right[0]:
					game.snake.direction = 'right';
					break;
				case game.key.down[0]:
					game.snake.direction = 'down';
					break;
				case game.key.pause[0]:
					game.start = 'pause';
					break;
				case game.key.esc[0]:
					game.Exit();
					break;
			}
		}
	};
	var keyButton = divSnake.find('.custom');
	var keyHeader = divSnake.find('#key');
	var icon = '<span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>';
	var keyFocused = false;

	keyButton.on('mouseover', function(){
		if(!keyFocused){
			keyHeader.html(icon +'Кликните мышкой для смены');
		}
	});	
	
	keyButton.on('mouseout', function(){
		if(!keyFocused){
			keyHeader.html(icon +'Клавиши управления');
		}
	});	

	keyButton.on('blur', function(){
			keyFocused = false;
			keyHeader.html(icon +'Клавиши управления');
	});
	
	keyButton.click(function(){
		
		keyHeader.html(icon +'Нажмите кнопку');
		keyFocused = true;

		$(this).keydown(function(e)
		{
			var event = window.event || e;
			var keycode = event.keyCode || event.which;
			var key = event.key || event.code;
			
			switch(keycode)
			{
				case 37:
					key = 'стр.Влево';
				break;
				case 38:
					key = 'стр.Верх';
				break;
				case 39:
					key = 'стр.Вправо';
				break;
				case 40:
					key = 'стр.Вниз';
				break;
				case 32:
					key = 'Пробел';
				break;
			}

			switch(this.id)
			{
				case 'key_left':
					game.key.left[0] = keycode;
					game.key.left[1] = key;
				break;					
				case 'key_right':
					game.key.right[0] = keycode;
					game.key.right[1] = key;
				break;					
				case 'key_up':
					game.key.up[0] = keycode;
					game.key.up[1] = key;
				break;					
				case 'key_down':
					game.key.down[0] = keycode;
					game.key.down[1] = key;
				break;
				case 'key_pause':
					game.key.pause[0] = keycode;
					game.key.pause[1] = key;
				break;
			}

			$(this).html(key);

			$(this).blur();
		});
	});
});
