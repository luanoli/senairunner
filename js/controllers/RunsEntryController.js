(function(){	

    angular.module('main.controllers').controller('RunsEntryController', ['$scope', 'api', '$location',
        function($scope, api, $location){
            api.runsEntry.list().success(function(data){   
                data.status_pagamento = data.status_pagamento *1;
                if(data.status_pagamento){
                    data.status_pagamento = "Sim";
                }else{
                    data.status_pagamento = "Não";
                }
                $scope.runsEntry = data;
            });

            $scope.insert = function(runEntry){
                $location.path('/runsEntry/insert');
            };		

            $scope.update = function(runEntry){
                $location.path('/runsEntry/update/' + runEntry.id);
            };			
    }]);

    angular.module('main.controllers').controller('RunsEntryFormController', ['$scope', 'api', '$location', '$routeParams',
        function($scope, api, $location, $routeParams){
            
            api.runs.list().success(function(data){
                $scope.runs = data;
            });
            api.runners.list().success(function(data){
                $scope.runners = data;
            });
            
            var id = $routeParams.idRunEntry;

            if ( id != null && id > 0 ){
                $scope.title = "Editar Inscrição";
                    api.runsEntry.get(id).success(function(data){                            
                        $scope.runEntry = data;
                    });
                    $scope.save = function(){
                        api.runsEntry.update($scope.runEntry).success(function(){
                            $location.path('/runsEntry');
                        }).error(function(data, headers, status){
                            console.log(headers + status);
                        });
                    };
            }else{
                $scope.title = "Efetuar Inscrição";
                $scope.runEntry = new RunsEntry();
                
                $scope.save = function(){
                    api.runsEntry.insert($scope.runEntry).success(function(){
                        $location.path('/runsEntry');
                    }).error(function(data, headers, status){
                        alert("Corredor já cadastrado para a corrida selecionada!");
                    });					
                };
            }

            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.cancel = function(){
                    $location.path('/runsEntry');
            };
    }]);

}).call(this);
