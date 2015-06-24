(function(){	

	angular.module('main.controllers')
		.controller('UsuarioController', ['$scope', 'api', '$location', 
			function($scope, api, $location){

		api.usuario.list().success(function(data){
			$scope.usuarios = data;
		});

		$scope.adicionar = function(usuario){
			$location.path('/usuario/inserir');
		};		

		$scope.editar = function(usuario){
			$location.path('/usuario/editar/' + usuario.id);
		};

		$scope.excluir = function(usuario){

		};

	}]);

	angular.module('main.controllers').controller('UsuarioFormController', ['$scope', 'api', '$location',
		function($scope, api, $location){	
		
			$scope.usuario = new Usuario();
		
		$scope.salvar = function(){
			api.usuario.insert($scope.usuario).success(function(){
				$location.path('/usuario');
			}).error(function(data, headers, status){
				console.log(headers + status);
			});					
		};

		$scope.cancelar = function(){
			$location.path('/usuario');
		};

	}]);

}).call(this);