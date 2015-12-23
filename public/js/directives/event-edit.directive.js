/**
 * Created by hugopozzoli on 22/12/15.
 */


BeMyApp.directive('eventEdit', ['$rootScope', '$EventService',
    function($rootScope, $EventService) {
        return {
            link: function($scope, element, attrs) {


                // Global variables

                var $modal = angular.element(element);

                // Variables

                $scope.initVars = function(Event) {
                    if (Event) {
                        $scope.event = angular.copy(Event);
                        $scope.event.date_formated = moment($scope.event.date).format('DD/MM/YYYY HH:mm');
                    } else $scope.event = {
                        title: "",
                        description: "",
                        date: moment(),
                        date_formated: moment().format('DD/MM/YYYY HH:mm'),
                        logo: ""
                    };
                };


                // Trigger new event module

                $scope.$on('Event:Edit', function(e, Event) {
                    $scope.initVars(Event);

                    $modal.modal('show');
                });


                // Save

                $scope.save = function() {
                    $scope.event.date_formated = angular.element('#form--date').val();
                    $scope.event.date = moment($scope.event.date_formated, 'DD/MM/YYYY HH:mm');

                    if (!$scope.event._id) {
                        $EventService.post($scope.event).success(function(data) {
                            if (data) {
                                $rootScope.$broadcast('Event:Added', data);
                                $modal.modal('hide');
                                $.snackbar({content:"Votre événement a été ajouté !", timeout:5000});
                            } else $.snackbar({content:"An error occured. Please try again later.", timeout:5000});
                        });
                    } else {
                        $EventService.put($scope.event).success(function(data) {
                            if (data) {
                                $rootScope.$broadcast('Event:Edited', data);
                                $modal.modal('hide');
                                $.snackbar({content:"Votre événement a été modifié !", timeout:5000});
                            } else $.snackbar({content:"An error occured. Please try again later.", timeout:5000});
                        });
                    }
                };


                // Remove event

                $scope.$on('Event:Edit:Delete', function(e, Event) {
                    if (confirm("Êtes vous sûr de vouloir supprimer cet événement ?")) {
                        $EventService.delete(Event).success(function(deleted) {
                            if (deleted) {
                                $rootScope.$broadcast('Event:Deleted', Event);
                                $.snackbar({content:"Votre événement a été supprimé !", timeout:5000});
                            } else $.snackbar({content:"An error occured. Please try again later.", timeout:5000});
                        });
                    }
                });

            }
        }
    }
]);