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
            
            $scope.view = function(run){                
                $location.path('/runs/' + run.id + '/runners');
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

            $scope.id_run = $routeParams.idRun;

            if ( $scope.id_run != null && $scope.id_run > 0 ){
                $scope.title = "Editar Corrida";
                api.runs.get($scope.id_run).success(function(data){
                    data.valor_inscricao = data.valor_inscricao * 1;
                    temp_data = data.data;
                    dt = temp_data.split("-");      
                    dt[1] = dt[1] - 1;
                    data.data = new Date(dt[0],dt[1],dt[2]);
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

    angular.module('main.controllers').controller('RunsDetailController', ['$scope', 'api', '$location', '$routeParams',
        function($scope, api, $location, $routeParams){            
            
            $scope.id_run = $routeParams.idRun;            
            
            api.runs.view($scope.id_run).success(function(data){
                $scope.run = data.run;
                $scope.runners = data.runners;
            });
            
            $scope.list = function(){
                $location.path('/runs');
            };		
    }]);

}).call(this);



