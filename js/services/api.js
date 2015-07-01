(function(){
	
    angular.module('main.services').service('api', ['$http', function($http){

        return {
            usuario: {
                list: function(){
                    return $http.get('rest/index.php/usuario');
                },
                update: function(usuario){
                    return $http.put('rest/index.php/usuario', usuario);
                },
                insert: function(usuario){
                    return $http.post('rest/index.php/usuario', usuario);
                }
            },
            runs: {
                list: function(){
                    return $http.get('rest/index.php/runs');
                },
                update: function(run){
                    return $http.put('rest/index.php/runs/' + run.id, run); 
                },
                insert: function(run){
                    return $http.post('rest/index.php/runs', run);
                },
                get: function(id){
                    return $http.get('rest/index.php/runs/' + id);
                },
                delete:  function(id){
                    return $http.delete('rest/index.php/runs/' + id);
                },
                view: function(id){
                    return $http.get('rest/index.php/runs/' + id + '/runners');
                }
            },
            runners: {
                list: function(){
                    return $http.get('rest/index.php/runners');
                },
                update: function(runner){
                    return $http.put('rest/index.php/runners/' + runner.id, runner); 
                },
                insert: function(runner){
                    return $http.post('rest/index.php/runners', runner);
                },
                get: function(id){
                    return $http.get('rest/index.php/runners/' + id);
                },
                delete:  function(id){
                    return $http.delete('rest/index.php/runners/' + id);
                }
            },
            runsEntry: {
                list: function(){
                    return $http.get('rest/index.php/runsEntry');
                },
                update: function(runEntry){
                    return $http.put('rest/index.php/runsEntry/' + runEntry.id, runEntry); 
                },
                insert: function(runEntry){
                    return $http.post('rest/index.php/runsEntry', runEntry);
                },
                get: function(id){
                    return $http.get('rest/index.php/runsEntry/' + id);
                },
                delete:  function(id){
                    return $http.delete('rest/index.php/runsEntry/' + id);
                }
            }    
        };

    }]);

}).call(this);