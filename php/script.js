// Globals
var LANG;
// Code goes here

angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($scope, $http, $uibModal, $log, $cacheFactory) {	$cacheFactory('cacheId').destroy();
  var pc = this;
  pc.data = navigator.appName;

  // デフォルトは日本語
  LANG = "ja";
  var sufix = "_ja";
  loadJSON($http, sufix, pc);

  // モーダル画面を開く
  pc.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: 'pc',
      size: size,
      resolve: {
        data: function () {
          pc.change(LANG);
          return pc.data;
        }
      }
    });

    modalInstance.result.then(function (res) {
      console.log(res);
    });
  };

  // 日本語と英語を切り替える
  pc.change = function(lang) {
    if (lang == 'ja') {
      LANG = 'ja';
      loadJSON($http, "_ja", pc);
    } else {
      LANG = 'en';
      loadJSON($http, "_en", pc);
    }
  };

});// end of ModalDemoCtrl

function loadJSON($http, sufix, pc) {
  var reqParam = {};
  reqParam.method = "JSONP";
  reqParam.url = "statements/index" + sufix + ".json";

  try {
    $http.get(reqParam.url).then(function(res) {
    	setData(pc, res.data);
    }, function(res) {
      console.log(res);
    });
  } catch(e) {
    console.log(e.message);
    alert(pc.exception);
  }

}

/*
 * data: レスポンスの下にあるデータオブジェクト「response.data」
 */
function setData(pc, data) {
    pc.title = data.title;
    pc.discription = data.discription;
    pc.login = data.login;
    pc.userName = data.userName;
    pc.passTitle = data.passTitle;
    pc.inputUser = data.inputUser;
    //pc.inputPassword = data.inputPassword;


}

/* モーダル画面の初期処理 */
angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($http, $uibModalInstance, data) {
  var pc = this;

  if (LANG == 'ja') {
	  loadJSON($http, "_ja", pc);
  } else {
	  loadJSON($http, "_en", pc);
  }

  pc.ok = function () {
	  if (pc.user == "") {
		  alert(pc.inputUser);
		  return;
	  }
	  if (pc.password == "") {
		  alert(pc.inputPassword);
		  return;
	  }

    //{Log.phpへ、POSTリクエストを送信}

    $http.post("./module/Login.php", createRequest(pc)).then(function(response) {
      setData(pc, response.data);
      if (response.data.isMessage == true) {
    	  // エラー時の処理
    	  alert(response.data.mes);
      } else {
          $http.get("./menu.html").then(function (res) {
        	  document.getElementById("contentMain").innerHTML = res.data;
          }, function(e) {
        	  alsert(e);
          });
      }
      //document.getElementById("contentMain").innerHTML = response.data;
    });
    $uibModalInstance.close();
  };

  pc.cancel = function () {
    //{...}
    $uibModalInstance.dismiss('cancel');
  };
});

function createRequest(pc) {
	return {"lang": LANG,
			"pc": pc
			};
}
