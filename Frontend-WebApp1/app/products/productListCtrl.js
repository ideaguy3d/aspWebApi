(function () {
    "use strict";
    angular
        .module("productManagement")
        .controller("ProductListCtrl",
                     ["productResource",
                         ProductListCtrl]);

    function ProductListCtrl(productResource) {
        var vm = this;

        productResource.query({
            $filter: "contains(ProductCode, 'GDN') and Price ge 5 and Price le 20",
            $orderby: "Price desc"},
            function (data) {
                vm.products = data;
            });

        // Alternative code using variables instead of hard-coded values
        //vm.searchCriteria = "GDN";
        //vm.sortProperty = "Price";
        //vm.sortDirection = "desc";

        //productResource.query({
        //    $filter: "contains(ProductCode, '" + vm.searchCriteria + "')" +
        //        " or contains(ProductName, '" + vm.searchCriteria + "')",
        //    $orderby: vm.sortProperty + " " + vm.sortDirection
        //}, function (data) {
        //    vm.products = data;
        //})

    }
}());
