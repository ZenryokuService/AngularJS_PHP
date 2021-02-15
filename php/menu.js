//var app = angular.module('ui.bootstrap.demo', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.controller('MenuCtrl', function ($scope, $controller) {

	//angular.extend(this, $controller('ModalInstanceCtrl', {$scope: $scope}));
    document.getElementById("menuContent").innerHTML = $scope.pc.content;
	//loadJSON($http, "_" + LANG, mc);
});

function createRequest(pc) {
	return {"lang": LANG,
			"pc": pc
	};
}

