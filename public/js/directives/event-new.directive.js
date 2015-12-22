/**
 * Created by hugopozzoli on 22/12/15.
 */


BeMyApp.directive('eventNew', ['$rootScope', '$EventService',
    function($rootScope, $EventService) {
        return {
            link: function($scope, element, attrs) {


                // Global variables

                var $modal = angular.element(element);

                // Variables

                $scope.initVars = function() {
                    $scope.event = {
                        title: "",
                        description: "",
                        date: "",
                        logo: ""
                    };
                };


                // Trigger new event module

                $scope.$on('Event:New', function() {
                    $scope.initVars();

                    $modal.modal('show');
                });


                // Do Post

                $scope.doPost = function() {
                    $EventService.post($scope.event).success(function(data) {
                        if (data) {
                            $rootScope.$broadcast('Event:New', data);
                            $modal.modal('hide');
                            $.snackbar({content:"Votre événement a été ajouté !.", timeout:5000});
                        } else $.snackbar({content:"An error occured. Please try again later.", timeout:5000});
                    });
                };

            }
        }
    }
]);