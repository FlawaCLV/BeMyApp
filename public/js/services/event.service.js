/**
 * Created by hugopozzoli on 22/12/15.
 */

BeMyApp.service('$EventService', ['$http',
    function($http) {

        this.get = function() {
            return $http.get('/events');
        };

        this.post = function(Event) {
            return $http.post('/event', Event);
        };

    }
]);