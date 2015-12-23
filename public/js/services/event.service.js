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

        this.put = function(Event) {
            return $http.put('/event', Event);
        };

        this.delete = function(Event) {
            return $http.delete('/event?id='+Event._id);
        };

    }
]);