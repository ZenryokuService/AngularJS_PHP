<?php
	include './Dao.php';

	$json = file_get_contents('php://input');
	$data = json_decode($json);

	// echo $data->user . "<br/>";
	// echo $data->password . "<br/>";

	$dao = new Dao();
?>