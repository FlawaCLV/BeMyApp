/**
 * Created by hugopozzoli on 23/12/15.
 */

BeMyApp.directive('events', [
    function() {
        return {
            link: function($scope, elements, attrs) {


                // New Event

                $scope.$on('Event:Added', function(e, Event) {
                    $scope.events.push(Event);
                });


                // Edit Event

                $scope.$on('Event:Edited', function(e, EventEdited) {
                    angular.forEach($scope.events, function(Event, i) {
                        if (Event._id == EventEdited._id)
                            $scope.events[i] = EventEdited;
                    })
                });


                // Delete Event

                $scope.$on('Event:Deleted', function(e, EventDeleted) {
                    angular.forEach($scope.events, function(Event, i) {
                        if (Event._id == EventDeleted._id)
                            $scope.events.splice(i, 1);
                    })
                });

            }
        }
    }
]);