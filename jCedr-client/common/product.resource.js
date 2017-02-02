/**
 * Created by Julius Alvarado on 1/26/2017.
 */

(function () {
    "use strict";

    var common = angular.module('common.services'),
        factoryId = 'jhaProductResource';

    common.factory(factoryId, ['$resource', 'appSettings', 'jhaCurrentUser',
        productResource]);

    function productResource($resource, appSettings, jhaCurrentUser) {
        // simply passing in the url path, not an object. 
        return $resource(
            appSettings.serverPath + 'api/products/:id', null,
            {
                'get': {
                    headers: { 'Authorization': 'Bearer ' + jhaCurrentUser.getProfile().token }
                },
                'save': {
                    headers: { 'Authorization': 'Bearer ' + jhaCurrentUser.getProfile().token }
                },
                'update': {
                    method: 'PUT',
                    headers: { 'Authorization': 'Bearer ' + jhaCurrentUser.getProfile().token }
                }
            }
        );
    }

}());