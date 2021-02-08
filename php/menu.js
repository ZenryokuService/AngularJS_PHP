app.controller('MenuCtrl', function ($scope, $http, $uibModal, $log, $cacheFactory) {

	$scope.initMenu = function openMenu(pc) {
		console.log(pc.mode);
	}
});