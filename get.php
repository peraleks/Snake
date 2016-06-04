<?php
if (isset($_POST['serch'])) {
    $serch = $_POST['serch'];
}
$results = file('results.txt');
$json = array();

foreach($results as $result)
{
	$string = explode(':', $result);
	$arr['name'] = $string[0];
	$arr['score'] = $string[1];
	if (!empty($serch))
	{
		if(mb_strtolower(mb_substr($arr['name'], 0, mb_strlen($serch)), 'utf-8') == mb_strtolower($serch, 'utf-8'))
			$json[] = $arr;
	}
	else
	{
		$json[] = $arr;
	}
}
echo json_encode($json);