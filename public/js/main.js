/**
 * Created by hugopozzoli on 22/12/15.
 */

var BeMyApp = angular.module('BeMyApp', [
    'ui.router'
]);

BeMyApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app', {
                url: "/",
                views: {
                    "@": {
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

    }
]);