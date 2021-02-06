<?php
	include './Dao.php';

	function getLoginMessage($lang) {
	    if ($lang == 'ja') {
	        return 'ログインできません';
	    } else {
	        return "can not login ...";
	    }
	}

	function getInputMessage($lang) {
	    if ($lang == 'ja') {
	        return 'すべて入力してください';
	    } else {
	        return "Input all ...";
	    }
	}

	$json = file_get_contents('php://input');
	$data = json_decode($json);

	// echo $data->user . "<br/>";
	// echo $data->password . "<br/>";

	$userData = null;
	if (isset($data->user)) {
	    $dao = Dao::getInstance();
	    $userData = $dao->login($data->user, $data->password);
	} else {
	    echo getInputMessage($data->lang);
	}

	if ($userData == 'Error' || $userData == null) {
	    echo getLoginMessage($data->lang);
	} else {
?>

	<div>{{pc.userName}}: <?php echo $data->user; ?></div>

<?php
	}
?>