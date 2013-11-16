<?php

if($_SERVER['REQUEST_METHOD'] == "POST"){

	header("Content-type: application/json");
	$url = $_POST['url'];
	$playlist = file_get_contents($url);
	preg_match_all("/(?P<chunks>[0-9]*).ts/", $playlist, $ret);
	$min = min($ret["chunks"]);
	$max = max($ret["chunks"]);
	echo '{"max":'.$max.',"min":'.$min.'}';
}


?>