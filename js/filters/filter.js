(function(){
    
    angular.module('main.filters').filter('ativo', function(){
        return function(valor){
            if(valor === "1" || valor === 1 || valor === true){
                return "Sim";
            }else{
                return "Não";
            }
        };
    }).filter('inscricao', function() {
        return function(insc){
            if(insc === "1" || insc === 1 || insc === true){
                return "Abertas";
            }else{
                return "Encerradas";
            }
        };        
    }).filter('datapt', function($filter) {
        return function (item) {
            if(angular.isUndefined(item) || item == null){
                return '-';
            }
                       
            dt = item.split("-");      
            dt[1] = dt[1] - 1;            
            
            var timeStamp = new Date(dt[0],dt[1],dt[2]).toISOString();
            return $filter('date')(timeStamp, "dd/MM/yyyy");
        };
    }).filter('moeda', function($filter) {
        return function (item, decimals) {
            return 'R$ '+$filter('number')(item, decimals);
        };
    });    
    
}).call(this);