// Globals
var LANG;

// Code goes here
var app = angular.module('ui.bootstrap.demo', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "views/login.htm",
			controller: "ModalDemoCtrl"
		}).when("/menu", {
			templateUrl: "views/menu.htm",
			controller: "MenuCtrl"
		});
});

app.controller('ModalDemoCtrl', function ($scope, $http, $uibModal, $log) {
  //$cacheFactory('cacheId').destroy();
  var pc = this;
  pc.data = navigator.appName;

  // デフォルトは日本語
  LANG = "ja";
  var sufix = "_ja";
  loadJSON($http, sufix, pc);

  var size = 1;
  // モーダル画面を開く
  pc.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: './views/myModalContent.html',
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

    modalInstance.result.then(function () {
        if (LANG == 'ja') {
            loadJSON($http, "_ja", pc);
        } else {
            loadJSON($http, "_en", pc);
        }
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
    pc.inputPassword = data.inputPassword;
    pc.mode = data.fravorMode;


}


/* モーダル画面の初期処理 */
angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($scope, $http, $uibModal, $uibModalInstance , data) {
  var pc = this;

  if (LANG == 'ja') {
	  loadJSON($http, "_ja", pc);
  } else {
	  loadJSON($http, "_en", pc);
  }

  pc.ok = function () {
	  if (pc.user == "" || pc.user == undefined) {
		  alert(pc.inputUser);
		  return;
	  }
	  if (pc.password == "" || pc.password == undefined) {
		  alert(pc.inputPassword);
		  return;
	  }

    //{Log.phpへ、POSTリクエストを送信}
    $http.post("./module/Login.php", createRequest(pc)).then(function(response) {
      setData(pc, response.data);
      if (response.data.isMessage == true) {
    	  // エラー時の処理
    	  alert(response.data.mes);
    	  return;
      }
      if (response.data.isMessage == false) {
    	  $scope.pc.content = response.data.content;
          location.href = '#!menu';
    	  //openMenu($uibModal, pc);
      }
      //document.getElementById("contentMain").innerHTML = response.data.content;
    });
    $uibModalInstance.close();
  };

  pc.cancel = function () {
    //{...}
    $uibModalInstance.dismiss('cancel');
  };


//メニューモーダルを開く
  function openMenu($uibModal, pc) {
	  var size = 1;
        var menuModalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
  	      ariaDescribedBy: 'modal-body',
  	      templateUrl: './views/menu.html',
  	      controller: 'MenuCtrl',
  	      controllerAs: 'mc',
  	      size: size,
  	      resolve: {
  	        data: function () {
  	          //pc.change(LANG);
  	          return pc.data;
  	        }
  	      }
        });

    menuModalInstance.result.then(function () {
        if (LANG == 'ja') {
            loadJSON($http, "_ja", pc);
          } else {
            loadJSON($http, "_en", pc);
          }
        //openMenu(pc
    });
  }

}); // Menu Modal

function createRequest(pc) {
	return {"lang": LANG,
			"pc": pc
			};
}
