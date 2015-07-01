(function(){

angular.module('main.controllers', []);
angular.module('main.services', []);
angular.module('main.filters', []);

angular.module('main', ['main.controllers', 'main.services', 'main.filters', 'ui.bootstrap', 'ngRoute']).config(['$routeProvider',function($routeProvider) {
	
	$routeProvider.when('/usuario/',{
		templateUrl: 'pages/usuario/list.html',
		controller: 'UsuarioController'
	}).when('/usuario/inserir',{
		templateUrl: 'pages/usuario/form.html',
		controller: 'UsuarioFormController'
	}).when('/usuario/editar/:idUsuario',{
		templateUrl: 'pages/usuario/form.html',
		controller: 'UsuarioFormController'
		
	}).when('/runs/',{
		templateUrl: 'pages/runs/list.html',
		controller: 'RunsController'
	}).when('/runs/insert',{
		templateUrl: 'pages/runs/form.html',
		controller: 'RunsFormController'
	}).when('/runs/update/:idRun',{		
		templateUrl: 'pages/runs/form.html',
		controller: 'RunsFormController'
        }).when('/runs/:idRun/runners',{                
                templateUrl: 'pages/runs/detail.html',
                controller: 'RunsDetailController'
                
	}).when('/runners/',{
		templateUrl: 'pages/runners/list.html',
		controller: 'RunnersController'
	}).when('/runners/insert',{
		templateUrl: 'pages/runners/form.html',
		controller: 'RunnersFormController'
	}).when('/runners/update/:idRunner',{		
		templateUrl: 'pages/runners/form.html',
		controller: 'RunnersFormController'	

        }).when('/runsEntry/',{
		templateUrl: 'pages/runsEntry/list.html',
		controller: 'RunsEntryController'
	}).when('/runsEntry/insert',{
		templateUrl: 'pages/runsEntry/form.html',
		controller: 'RunsEntryFormController'
	}).when('/runsEntry/update/:idRunEntry',{		
		templateUrl: 'pages/runsEntry/form.html',
		controller: 'RunsEntryFormController'

	}).otherwise({redirectTo: '/runs'});

	
}]);

}).call(this);