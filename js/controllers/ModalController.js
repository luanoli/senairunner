(function(){

    angular.module('main.controllers').controller('ModalController', function ($scope, $modalInstance, mensagem) {  
        $scope.mensagem = mensagem;

        $scope.ok = function () {
            $modalInstance.close(true);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss(false);
        };
    });

}).call(this);