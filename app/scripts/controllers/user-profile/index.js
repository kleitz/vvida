angular.module('vvida.controllers')
  .controller('UserProfileCtrl', ['$scope', '$rootScope', '$state', 'Users',
    function($scope, $rootScope, $state, Users) {

      $scope.init = function() {
        $scope.menu = [{
          link: 'userProfile.events',
          title: 'Events',
          icon: 'fa fa-calendar'
        }, {
          link: 'userProfile.products',
          title: 'Products',
          icon: 'fa fa-th-list'
        }];

        $scope.ownerMenu = [{
          link: 'userProfile.edit',
          title: 'Edit Your Profile',
          icon: 'fa fa-pencil'
        }];

        // Route to defualt view
        $state.go('userProfile.events');



        Users.eventsCount($rootScope.currentUser, function(err, res) {
          if (err) {
            $scope.eventsCount = 0;
          } else {
            $scope.eventsCount = res;
          }
        });

        Users.itemsCount($rootScope.currentUser, function(err, res) {
          if (err) {
            $scope.itemsCount = 0;
          } else {
            $scope.itemsCount = res;
          }
        });

        Users.reviewsCount($rootScope.currentUser, function(err, res) {
          if (err) {
            $scope.reviewsCount = 0;
          } else {
            $scope.reviewsCount = res;
          }
        });
      };
    }
  ]);
