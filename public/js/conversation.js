app.controller('ConvCtrl', ['$scope', '$http', '$stateParams',
  function($scope, $http, $stateParams) {

    $scope.init = function() {
      $http.get('/api/conversations/' + $stateParams.conversationId).then(function(response) {
        $scope.conversation = response.data;
      }, function(err) {
        if (err.status !== 401) {
          console.error(err);
        }
      });
    };

    $scope.submit = function(id, text) {
      console.log(id, text);
      $http.put('/api/conversations/' + id, {text: text}).then(function(response) {
        var part = $scope.conversation.participants;
        $scope.conversation = response.data;
        $scope.conversation.participants = part;
        $scope.message = '';
      }, function(err) {
        var text;
        if (err.status === 409) {
          text = 'The e-mail is already used. If you have registered and forgot your password, please proceed to password reset.';
          $('h4.error').text(text);
          $('div#show-error').modal();
        }
        else {
          console.error(err);
          text = 'We were not able to update your details at this time. Please try again later.';
          $('h4.error').text(text);
          $('div#show-error').modal();
        }
      });
    };
  }]);
