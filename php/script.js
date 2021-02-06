// Code goes here

angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($scope, $http, $uibModal, $log) {
  var pc = this;
  pc.data = navigator.appName;

  // デフォルトは日本語
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
          return pc.data;
        }
      }
    });

    modalInstance.result.then(function () {
      console.log("now I'll close the modal");
    });
  };

  // 日本語と英語を切り替える
  pc.change = function(lang) {
    if (lang == 'ja') {
      loadJSON($http, "_ja", pc);
    } else {
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
  pc.title = "Login";
  console.log(data);
  pc.data = data;

  pc.ok = function () {
    //{...}
console.log(pc.user);
    $http.post("./module/Login.php", {"user": pc.user, "password": pc.password}).then(function(response) {
      console.log(response);
    });
    $uibModalInstance.close();
  };

  pc.cancel = function () {
    //{...}
    $uibModalInstance.dismiss('cancel');
  };
});
