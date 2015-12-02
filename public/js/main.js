'use strict';

var app = angular.module('Conversation', ['satellizer', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
      .state('default', {
        url: '/',
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'partials/profile',
        controller: 'ProfCtrl'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'partials/users',
        controller: 'UsersCtrl'
      })
      .state('conversations', {
        url: '/conversations',
        templateUrl: 'partials/conversations',
        controller: 'ConvsCtrl'
      })
      .state('conversation', {
        url: '/conversation/:conversationId',
        templateUrl: 'partials/conversation',
        controller: 'ConvCtrl'
      });

  $authProvider.facebook({
    clientId: '924337914326712'
  });

  $authProvider.linkedin({
    clientId: '77reigersixrfn'
  });

  $authProvider.twitter({
    clientId: 'T4Q5ltrRgY0svVhr56RCAbc1c'
  });

});
