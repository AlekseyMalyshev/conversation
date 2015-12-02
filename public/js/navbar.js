'use strict';


angular.module('Conversation')
  .controller('navBar', ['$scope', '$auth', '$templateCache', '$state', '$stateParams',
    function($scope, $auth, $templateCache, $state, $stateParams) {

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
      $templateCache.removeAll();
      if (!$state.current.abstract) {
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
        $auth.logout();
      }
    }

  }]);

