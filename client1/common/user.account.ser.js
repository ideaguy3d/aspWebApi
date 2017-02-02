/**
 * Created by JHernandezAlvarado on 1/31/2017.
 */

(function () {
    'use strict';

    var app = angular.module('common.services'),
        serviceId = 'jhaUserAccount';

    app.factory(serviceId, ['$resource', 'appSettings', userAccountClass]);

    function userAccountClass($resource, appSettings) {

        return {
            // resistration.registerUser
            registration: $resource(appSettings.serverPath + 'api/account/Register', null,
                {
                    'registerUser': {method: 'POST'}
                }
            ),
            // login.loginUser
            login: $resource(appSettings.serverPath + 'Token', null,
                {
                    'loginUser': {
                        method: 'POST',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function(data, headersGetter){
                            var str = [];
                            for(var d in data) str.push(encodeURIComponent(d)+"="+encodeURIComponent(data[d]));
                            return str.join("&");
                        }
                    }
                }
            )
        }
    }
})();

//