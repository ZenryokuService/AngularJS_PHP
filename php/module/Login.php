<?php
    /*
     * 入力チェックはJSで実装している
     */
	include './Dao.php';

	function getLoginMessage($lang, $isException) {
        $mesJa = 'ログインできません';
        $mesEn = 'can not login ';
	    if ($lang == 'ja') {

	        return $isException ? $mesJa : $mesJa . '<br/><a href="#">管理者に連絡</a>して下さい';
	    } else {
	        return $isException ? $mesEn : $mesEn . '<br/>Please contact <a href="#">manager</a>';
	    }
	}
    // JSONの取得
	$json = file_get_contents('php://input');
	$data = json_decode($json);

	// echo $data->user . "<br/>";
	// echo $data->password . "<br/>";

	$dao = Dao::getInstance();
	$user = $data->pc->user;
	$userName = $data->pc->userName;
	$userData = $dao->login($data->pc->user, $data->pc->password);

	if ($userData == 'Error') {
	    $arr = array('mes' => getLoginMessage($data->lang, true), 'isMessage' => true);
	} else if ($userData == null) {
	    $arr = array('mes' => getLoginMessage($data->lang, false), 'isMessage' => true);
	} else {
	    // JSONを返却する
	    $arr = array('mes' => $userData, 'isMessage' => false);
	}
	print(json_encode($arr));
?>