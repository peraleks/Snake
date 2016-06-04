<?php?>
<!DOCTYPE html>
<html>
<head>
	<title>Змейка</title>
	<meta charset="utf-8">
	<script type="text/javascript" src="jquery/jquery.js"></script>
		<script type="text/javascript" src="jquery/jquery-ui.js"></script>
	<link type="text/css" href="jquery/jquery-ui.css" rel="stylesheet">
	<script language="javascript" src="js/game.js"></script>
	<script language="javascript" src="js/matrix.js"></script>
	<script language="javascript" src="js/snake.js"></script>
	<script language="javascript" src="js/print_r.js"></script>
	<link rel="stylesheet" href="css/style.css" type="text/css" >
	<script language="javascript" src="js/onload.js"></script>
</head>
<body>
<div id="snake">
	<div id="wrap">
		<div id="time"><div id="time_text">Время</div><div id="time_c"></div></div>
		<div id="total_score"><div></div></div>
		<div class="clear"></div>
		<div id="matrix"></div>
		<div id="score"><div id="score_c"><div id="score_text">0</div></div></div>
	<div class="clear"></div>
	</div>
	<div id="accordion_wrap">
		<div id="accordion">
			<h3>Правила игры</h3>
			<div id="rules">
			<p>В игре пять уровней. Чтобы перейти на следующий уровень вы должны набрать
			определённое количество очков за отведённое время.</p>
			<p>Очки начисляются за поедание:</p>
			<img  src="img/apple.png"> <div class="points">- 20</div>
			<div class="clear"></div>
			<img  src="img/strawberry.png"><div class="points"> - 10</div>
			<div class="clear"></div>
			<img  src="img/nut.png"><div class="points"> - 7</div>
			<div class="clear"></div>
			<img  src="img/lemon.png"><div class="points"> - 3</div>
			<div class="clear"></div>
			<img  src="img/meat.png"><div class="points"> - 0</div>
			<div class="clear"></div>
			<img  src="img/bank.gif"><div class="points bank"> - отнимает 20</div>
			<p>Плюс к этому начисляется <span class="points">10 очков</span> за каждое выросшее звено змейки. Змейка не растёт когда съедает
			консервную банку. Так же змея может откусить свой хвост и вы потеряете соответствующее количество очков.</p>
			<p>Вобщем змейка должна есть побольше яблок и поменьше мяса, иначе она станет большой и неповоротливой, и будет часто откусывать себе хвост.</p>
			<p>Два последних уровня несколько отличаются от предыдущих.</p>
			</div>
			<h3 id="key">Клавиши управления</h3>
			<div id="key_wrap">
				<div id="key_left" class="key_button custom" tabindex="1"></div>
				<div class="key_instr">Влево</div>
				<div class="clear"></div>
				<div id="key_right" class="key_button custom" tabindex="2"></div>
				<div class="key_instr">Вправо</div>
				<div class="clear"></div>
				<div id="key_up" class="key_button custom" tabindex="3"></div>
				<div class="key_instr">Вверх</div>
				<div class="clear"></div>
				<div id="key_down" class="key_button custom" tabindex="4"></div>
				<div class="key_instr">Вниз</div>
				<div class="clear"></div>
				<div  id="key_pause" class="key_button custom" tabindex="5">Пробел</div>
				<div class="key_instr">Пауза</div>
				<div class="clear"></div>
				<div  class="key_button">Esc</div>
				<div class="key_instr">Выход из игры</div>
			</div>
			<h3>Рейтинг игроков</h3>
			<div><div id="score_mes"></div><input type="text" id="serch" placeholder="Искать по имени"></div>
		</div>
	</div>
	<div id="message"></div>
</div>
</body>
</html>