'use strict';


angular.module('Conversation')
  .controller('navBar', function($scope, $auth) {

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          console.log('signed with ' + provider, response);
        })
        .catch(function(err) {
          console.log('auth error: ', err)
        });
    };

    $scope.logout = function() {
      $auth.logout();
      $state.go('default');
    }

  });

