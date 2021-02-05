<?php
    $pdo = new PDO('mysql:dbname=mysql;host=localhost', 'root', '');
    //phpinfo();

?>
<!doctype html>
<html ng-app="ui.bootstrap.demo">
<head>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-animate.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-sanitize.js"></script>

    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-2.5.0.js"></script>
    <script src="script.js"></script>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

    <div ng-controller="ModalDemoCtrl as pc" class="container modal-demo">
    	<h1 class=""text-center>31 Ice cream</h1>
        <button type="button" class="btn btn-primary" ng-click="pc.open()">Login for normal user.</button>
        <button type="button" class="btn btn-success" ng-click="pc.open('lg')">Login for manager</button>
        <button type="button" class="btn btn-info" ng-click="pc.open('sm')">Small modal Sample</button>
        <div>data in controller : <strong>{{ pc.data }}</strong></div>
    </div>
</body>

</html>