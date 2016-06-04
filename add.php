<?php
$name = Protect(mb_substr($_POST['name'], 0, 9, 'utf-8'));
$score = ($_POST['score'] * 1);

$f = fopen('results.txt', 'a+');
fwrite($f, $name . ":" . $score . "\n");
fclose($f);

function Protect($string)
{
	return htmlspecialchars($string) . '';
}