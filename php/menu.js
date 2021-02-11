app.controller('MenuCtrl', function ($scope, $controller) {

	angular.extend(this, $controller('ModalInstanceCtrl', {$scope: $scope}));
    document.getElementById("menuContent").innerHTML = $scope.pc.content;
	//loadJSON($http, "_" + LANG, mc);
});

function loadJSON($http, sufix, mc) {
	  var reqParam = {};
	  reqParam.method = "JSONP";
	  reqParam.url = "statements/index" + sufix + ".json";

	  try {
	    $http.get(reqParam.url).then(function(res) {
	    	setData(mc, res.data);
	    }, function(res) {
	      console.log(res);
	    });
	  } catch(e) {
	    console.log(e.message);
	    alert(mc.exception);
	  }
	}
