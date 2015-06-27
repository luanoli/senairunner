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

            $scope.id_runner = $routeParams.idRunner;

            if ( $scope.id_runner != null && $scope.id_runner > 0 ){
                $scope.title = "Editar Corredor";
                api.runners.get($scope.id_runner).success(function(data){
                    
                    temp_data = data.data_nasc;
                    dt = temp_data.split("-");      
                    dt[1] = dt[1] - 1;
                    data.data_nasc = new Date(dt[0],dt[1],dt[2]);
                    
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
                $scope.title = "Inserir Corredor";
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