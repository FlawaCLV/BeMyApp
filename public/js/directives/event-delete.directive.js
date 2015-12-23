/**
 * Created by hugopozzoli on 22/12/15.
 */


BeMyApp.directive('eventDelete', ['$rootScope', '$EventService',
    function($rootScope, $EventService) {
        return {
            link: function($scope, element, attrs) {


                // Global variables

                var $modal = angular.element(element);


                // Trigger new event module

                $scope.$on('Event:Delete', function(e, evt, Event) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    $scope.event = angular.copy(Event);

                    $modal.modal('show');
                });


                // Delete event

                $scope.delete = function() {
                    $EventService.delete($scope.event).success(function(deleted) {
                        if (deleted) {
                            $rootScope.$broadcast('Event:Deleted', $scope.event);
                            $modal.modal('hide');
                            $.snackbar({content:"Votre événement a été supprimé !", timeout:5000});
                        } else $.snackbar({content:"An error occured. Please try again later.", timeout:5000});
                    });
                };

            }
        }
    }
]);