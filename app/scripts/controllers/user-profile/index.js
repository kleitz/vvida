angular.module('vvida.controllers')
  .controller('UserProfileCtrl', ['$scope', '$rootScope', '$state',
    'Users', '$mdSidenav',
    function($scope, $rootScope, $state, Users, $mdSidenav) {
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

        $scope.close = function() {
          $mdSidenav('profileSideNav').close();
        };

        $scope.toggleSidenav = function() {
          $mdSidenav('profileSideNav').toggle();
        };

        // Route to defualt view
        var stateName = $state.current.name;
        if (/^userProfile$/.test(stateName)) {
          $state.go('userProfile.events');
        }

        Users.eventsCount($rootScope.currentUser, function(err, res) {
          if (err) {
            $scope.message = 'Error loading page';
          } else {
            $scope.eventsCount = res;
          }
        });

        Users.itemsCount($rootScope.currentUser, function(err, res) {
          if (err) {
            $scope.message = 'Error loading page';
          } else {
            $scope.itemsCount = res;
          }
        });

        Users.reviewsCount($rootScope.currentUser, function(err, res) {
          if (err) {
            $scope.message = 'Error loading page';
          } else {
            $scope.reviewsCount = res;
          }
        });
      };
    }
  ]);
