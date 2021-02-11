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

	function getTitle($lang) {
	    $mesJa = '商品選択';
	    $mesEn = 'Menu selection';
	    if ($lang == 'ja') {

	        return $mesJa;
	    } else {
	        return $mesEn;
	    }
	}

	function getSelection($lang) {
	    $mesJa = '選択';
	    $mesEn = 'select';
	    if ($lang == 'ja') {

	        return $mesJa;
	    } else {
	        return $mesEn;
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
	    $title = getTitle($data->lang);

	    $fravors = $dao->selectFravors();
	    $select = getSelection($data->lang);

$menuContent =<<< EOD
	<div ng-controller="MenuCtrl as mc" ng-init="init()" class="container modal-demo text-center">
	<div id="menuTitle" ng-model="pc.fravorMode"></div>
EOD;
    $items = null;
    foreach($fravors as $f) {
$fravorContent = <<<EOD
	<div class="card" style="width: 18rem;">
      <img src="{$f['url']}"/>
	  <div class="card-body">
	    <h5 class="card-title">{$f['name']}</h5>
	    <p class="card-text">{$f['discription']}</p>
	    <a href="#" class="btn btn-primary">{{pc.select}}</a>
	  </div>
	</div>
EOD;
    $items = $items . $fravorContent;
    }
        // JSONを返却する
	    $arr = array('mes' => $userData, 'content' => $menuContent . $items, 'isMessage' => false);
//	    $arr = array('mes' => $userData, 'isMessage' => false);
	}
	print(json_encode($arr));
?>