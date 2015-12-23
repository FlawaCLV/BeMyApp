/**
 * Created by hugopozzoli on 22/12/15.
 */

var mongoose    = require('mongoose'),
    Event       = require('./Entities/Event').Event;


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
            Event.find(function (err, events) {
                if (err) return res.send(false);

                res.send(events);
            });
        });


        // [POST] Event

        app.post('/event', function(req, res) {
            var event = new Event({
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
            Event.update({ _id: req.body._id }, req.body, {upsert: true}, function(err) {
                if (err) return res.send(false);

                res.send(req.body);
            });
        });


        // [DELETE] Event

        app.delete('/event', function(req, res) {
            Event.remove({ _id: req.query.id }, function(err, removed) {
                if (err) return res.send(false);

                res.send(removed);
            });
        });

    }
};

exports.routing = routing;