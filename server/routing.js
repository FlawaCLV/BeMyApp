/**
 * Created by hugopozzoli on 22/12/15.
 */

var mongoose    = require('mongoose'),
    EventSchema = require('./Entities/Event');


var routing =  {
    start: function(app) {


        // Angular APP

        app.get('/', function (req, res) {
            res.render('layout', {});
        });


        /*
         * Event Restful API
         */


        // [GET] Event

        app.get('/events', function(req, res) {
            var Event = mongoose.model('Event', EventSchema);

            Event.find(function (err, events) {
                if (err) return res.send(false);
                res.send(events);
            });

        });


        // [POST] Event

        app.post('/event', function(req, res) {
            var Event = mongoose.model('Event', EventSchema),
                event = new Event({
                    title: req.body.title,
                    description: req.body.description,
                    date: req.body.date,
                    logo: req.body.logo
                });

            event.save(function (err, event) {
                if (err) return res.send(false);
                res.send(event);
            });
        });


        // [PUT] Event

        app.put('/event', function(req, res) {
            var Event = mongoose.model('Event', EventSchema);

            Event.find({
                title: req.body.title
            }, function(err, event) {
                if (err) return res.send(false);
                res.send(event);
            });
        });

    }
};

exports.routing = routing;