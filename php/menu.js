app.controller('MenuCtrl', function ($scope, $http, $uibModal, $log, $cacheFactory) {

	var mc = this;
	loadJSON($http, "_" + LANG, mc);
	$scope.initMenu = function openMenu(pc) {
		console.log(pc.mode);
	}
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
