'use strict';

var app = angular.module('Conversation', ['satellizer', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
      .state('default', {
        url: '/',
        templateUrl: 'partials/default'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'partials/profile'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'partials/users'
      })
      .state('conversations', {
        url: '/conversations',
        templateUrl: 'partials/conversations'
      });

  $authProvider.facebook({
    clientId: '924337914326712'
  });

  $authProvider.google({
    clientId: 'Google Client ID'
  });

  $authProvider.linkedin({
    clientId: 'LinkedIn Client ID'
  });

});
