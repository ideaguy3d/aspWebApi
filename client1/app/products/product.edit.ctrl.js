/**
 * Created by Julius Alvarado on 1/29/2017.
 */

(function () {
    "use strict";
    var controllerId = 'ProductEditCtrl';
    var app = angular.module('productManagement');

    app.controller(controllerId, ['jhaProductResource', editProductClass]);

    function editProductClass(jhaProductResource) {
        var vm = this;
        vm.editProdMessage = 'ello from editProductCtrlFunction';
        vm.product = {};
        vm.message = '';

        // imm! invoked code when the ctrl loads.
        jhaProductResource.get({id: 5}, function (data) {
            vm.product = data;
            vm.originalProduct = angular.copy(data);
        }, function(res){
            vm.message = "ja: "+res.statusText + "\r\n";
            if(res.data.exceptionMessage) vm.message += ", res: "+res.data.exceptionMessage;
        });

        if (vm.product && vm.product.productId) {
            vm.title = 'Edit: ' + vm.product.productName;
        } else {
            vm.title = "New Product Title";
        }

        vm.submit = function () {
            vm.message = '';
            // if the product has an id we assume it's an update method.
            if (vm.product.productId) {
                vm.product.$update({id: vm.product.productId},
                    // the success callback
                    function (data) {
                        vm.message = "... Save Complete";
                    },
                    // the error callback
                    function(res){
                        vm.message = res.statusText + '\r\n';
                        if(res.data.modelState) {
                            for (var key in res.data.modelState) {
                                vm.message += "res.data.modelState[key] = " +
                                    res.data.modelState[key] + '\r\n';
                            }
                        }
                        if(res.data.exceptionMessage) vm.message += "res.data.exceptionMessage = " +
                            res.data.exceptionMessage;
                    }
                );
            } else { // if no productId assume we're saving a new product.
                vm.product.$save(function(data) {
                    vm.originalProduct = angular.copy(data);
                    vm.message = "... Save Complete";
                },  function(res){
                    vm.message = res.statusText + '\r\n';
                    if(res.data.exceptionMessage) vm.message += ", res: "+res.data.exceptionMessage;
                });
            }
        };

        vm.cancel = function (editForm) {
            editForm.$setPristine();
            vm.product = angular.copy(vm.originalProduct);
            vm.message = '';
        }
    }
}());

//\\