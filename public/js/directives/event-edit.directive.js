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

                $scope.$on('Event:Edit', function(e, evt, Event) {
                    evt.stopPropagation();
                    evt.preventDefault();

                    $scope.initVars(Event);

                    $modal.modal('show');
                });


                // Upload logo

                $scope.logo = function($file) {
                    if ($file) {
                        var stream = ss.createStream();

                        ss(socket).emit('File:Upload', stream, {format:$file.name.split('.').pop()});

                        var blobStream = ss.createBlobReadStream($file),
                            size = 0,
                            percent = 0;

                        NProgress.start();

                        blobStream.on('data', function(chunk) {
                            size += chunk.length;
                            percent = Math.floor(size / $file.size * 100);
                            NProgress.set(percent/100);
                        });

                        blobStream.pipe(stream);
                    }
                };


                // Logo uploaded

                socket.on('File:Uploaded', function(data) {
                    $scope.event.logo = data.path;
                    $scope.$apply();

                    NProgress.done();
                    $.snackbar({content:File.name+" a été chargé.", timeout:5000});
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

            }
        }
    }
]);