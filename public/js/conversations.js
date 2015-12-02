app.controller('ConvsCtrl', ['$scope', '$http', '$state',
  function($scope, $http, $state) {

    $scope.init = function() {
      $http.get('/api/conversations').then(function(response) {
        $scope.conversations = response.data;
      }, function(err) {
        if (err.status !== 401) {
          console.error(err);
        }
      });
    };

    $scope.goto = function(id) {
      $state.go('conversation', {conversationId: id});
    };
  }]);
