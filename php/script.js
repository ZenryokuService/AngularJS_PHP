// Globals
var LANG;
// Code goes here

angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($scope, $http, $uibModal, $log) {
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
      pc.title = res.data.title;
      pc.discription = res.data.discription;
      pc.login = res.data.login;
      pc.userName = res.data.userName;
      pc.passTitle = res.data.passTitle;
    }, function(res) {
      console.log(res);
    });
  } catch(e) {
    console.log(e.message);
  }

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
    //{...}

    $http.post("./module/Login.php", {"user": pc.user, "password": pc.password, "lang": LANG}).then(function(response) {
      console.log(response);
      document.getElementById("contentMain").innerHTML = response.data;
    });
    $uibModalInstance.close();
  };

  pc.cancel = function () {
    //{...}
    $uibModalInstance.dismiss('cancel');
  };
});
