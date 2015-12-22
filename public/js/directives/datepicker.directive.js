/**
 * Created by hugopozzoli on 22/12/15.
 */

BeMyApp.directive('datepicker', ['$timeout',
    function($timeout) {
        return {
            link: function($scope, element, attrs) {

                $timeout(function() {
                    angular.element(element).datetimepicker({
                        defaultDate: moment(),
                        format: 'DD/MM/YYYY'
                    });
                });

            }
        }
    }
]);