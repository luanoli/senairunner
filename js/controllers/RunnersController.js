(function(){	

	angular.module('main.controllers').controller('RunnersController', ['$scope', 'api', '$location', '$modal',
		function($scope, api, $location, $modal){
			api.runners.list().success(function(data){
				$scope.runners = data;
			});

			$scope.insert = function(runner){
				$location.path('/runners/insert');
			};		

			$scope.update = function(runner){
				$location.path('/runners/update/' + runner.id);
			};

			$scope.delete = function(runner){
				var modalInstance = $modal.open({
					templateUrl: 'pages/partials/modal.html',
					controller: 'ModalController',
					resolve: {
						mensagem: function () {
							return "Deseja excluir o corredor?";
						}
					}
			    });

			    modalInstance.result.then(function () {
					api.runners.delete(runner.id).success(function(){
						$scope.runners.splice($scope.runners.indexOf(runner), 1);						
					}).error(function(){
						
					});
			    });
			};
	}]);

	angular.module('main.controllers').controller('RunnersFormController', ['$scope', 'api', '$location', '$routeParams',
		function($scope, api, $location, $routeParams){
			
			var id = $routeParams.idRunner;

    		if ( id != null && id > 0 ){
		 	 	api.runners.get(id).success(function(data){
				 	$scope.runner = data;
	 			});
	 			$scope.save = function(){
					api.runners.update($scope.runner).success(function(){
						$location.path('/runners');
					}).error(function(data, headers, status){
						console.log(headers + status);
					});
				};
    		}else{
    			$scope.runner = new Runners();

    			$scope.save = function(){
					api.runners.insert($scope.runner).success(function(){
						$location.path('/runners');
					}).error(function(data, headers, status){
						console.log(headers + status);
					});
				};
    		}

			$scope.estados = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO" ];
		
			$scope.open = function($event) {
			    $event.preventDefault();
			    $event.stopPropagation();

			    $scope.opened = true;
			};

			$scope.cancel = function(){
				$location.path('/runners');
			};
	}]);

}).call(this);