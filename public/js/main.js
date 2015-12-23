/**
 * Created by hugopozzoli on 22/12/15.
 */

var socket = {on: function() {}};

var BeMyApp = angular.module('BeMyApp', [
    'ui.router',
    'ngFileUpload'
]);

BeMyApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app', {
                url: "/",
                resolve: {
                    events: ['$q', '$EventService', function($q, $EventService) {
                        var def = $q.defer();

                        $EventService.get().success(function(events) {
                            def.resolve(events);
                        }).error(function(err) { def.reject(err); });

                        return def.promise;
                    }]
                },
                views: {
                    "@": {
                        controller: ['$scope', 'events', function($scope, events) {
                            $scope.events = events;
                        }],
                        templateUrl: "/public/js/templates/layout.html"
                    }
                }
            });

        $urlRouterProvider.otherwise("/");

    }
]);

BeMyApp.run([
    function() {

        console.info('Angular APP is running');

        socket = io.connect();

        socket.on('connect', function() {
            console.info('Socket is connected');
        });

    }
]);