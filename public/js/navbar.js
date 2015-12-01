'use strict';


angular.module('Conversation')
.controller('navBar', function($scope, $auth) {

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider);
  };

});

