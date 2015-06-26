(function(){	

    angular.module('main.controllers').controller('RunsController', ['$scope', 'api', '$location', '$modal',
        function($scope, api, $location, $modal){
            api.runs.list().success(function(data){
                $scope.runs = data;
            });

            $scope.insert = function(run){
                $location.path('/runs/insert');
            };		

            $scope.update = function(run){
                $location.path('/runs/update/' + run.id);
            };

            $scope.delete = function(run){
                var modalInstance = $modal.open({
                    templateUrl: 'pages/partials/modal.html',
                    controller: 'ModalController',
                    resolve: {
                        mensagem: function () {
                            return "Deseja excluir a corrida?";
                        }
                    }
                });

                modalInstance.result.then(function () {
                    api.runs.delete(run.id).success(function(){
                        $scope.runs.splice($scope.runs.indexOf(run), 1);						
                    }).error(function(){
                        alert("Existem corredores inscritos nessa corrida!");
                    });
                });
            };
    }]);

    angular.module('main.controllers').controller('RunsFormController', ['$scope', 'api', '$location', '$routeParams',
            function($scope, api, $location, $routeParams){

                    var id = $routeParams.idRun;

            if ( id != null && id > 0 ){
                    $scope.title = "Editar Corrida";
                            api.runs.get(id).success(function(data){
                                    data.valor_inscricao = data.valor_inscricao * 1;
                                    $scope.run = data;
                            });
                            $scope.save = function(){
                                    api.runs.update($scope.run).success(function(){
                                            $location.path('/runs');
                                    }).error(function(data, headers, status){
                                            console.log(headers + status);
                                    });
                            };
            }else{
                    $scope.title = "Inserir Corrida";
                    $scope.run = new Runs();

                    $scope.save = function(){
                                    api.runs.insert($scope.run).success(function(){
                                            $location.path('/runs');
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
                            $location.path('/runs');
                    };
    }]);

}).call(this);