/**
 * Created by JHernandezAlvarado on 2/1/2017.
 */


(function(){
    'use strict';

    angular.module('common.services').factory('jhaCurrentUser', currentUser);

    function currentUser() {
        var profile = {
            isLoggedIn: false,
            username: '',
            token: ''
        };

        var setProfile = function(username, token){
            profile.username = username;
            profile.token = token;
            profile.isLoggedIn = true;
            // console.log("token - "+profile.token, "username = "+ profile.username);
        };

        var getProfile = function(){
            return profile;
        };

        return {
            setProfile: setProfile,
            getProfile: getProfile
        }
    }
})();