(function(){
    "use strict";

    var controllerId = 'MainCtrl', 
        app = angular.module('productManagement'); 

    app.controller(controllerId, ['jhaUserAccount', 'jhaCurrentUser',
        mainCtrlFunction
    ]);

    function mainCtrlFunction (jhaUserAccount, jhaCurrentUser) {
        var vm = this;
        
        vm.isLoggedIn = function(){
            return jhaCurrentUser.getProfile().isLoggedIn;
        };

        vm.message = '';

        vm.userData = {
            userName: 'jtest1',
            email: 'jtest1@gmail.com',
            password: 'abc',
            confirmPassword: ''
        };

        vm.registerUser = function(){
            vm.userData.confirmPassword = vm.userData.password;
            console.log(vm.userData);
            jhaUserAccount.registration.registerUser(vm.userData, function(data){
                vm.confirmPassword = "";
                vm.message = "zRegistration is a success \\^_^/";
                vm.login();
                console.log(data);
            }, function(response){
                vm.isLoggedIn = false;
                vm.message = "{ response.statusText = "+response.statusText + "\r\n}";
                if(response.data.exceptionMessage) vm.message += " { response.data.exceptionMessage ="
                    +response.data.exceptionMessage +" } ";

                // the validation errors:
                if(response.data.modelState) {
                    for (var key in response.data.modelState) {
                        vm.message += " { response.data.modelState["+key+"] " + response.data.modelState[key] + "\r\n } ";
                    }
                }
            });
        };

        vm.login = function() {
            vm.userData.grant_type = 'password';
            vm.userData.userName = vm.userData.email;

            jhaUserAccount.login.loginUser(vm.userData, function(data){
               vm.message = "";
               vm.password = "";
               // console.log(vm.userData, data.access_token);
               jhaCurrentUser.setProfile(vm.userData.userName, data.access_token);
            }, function(response){
                vm.password = "";
                vm.message = 'jha - login failed: '+ response.statusText + "\r\n";
                if(response.data.exceptionMessage) vm.message += response.data.exceptionMessage;
                if(response.data.error) vm.message += response.data.error;
            });
        };

    }
}());

