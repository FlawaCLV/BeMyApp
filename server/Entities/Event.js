/**
 * Created by hugopozzoli on 22/12/15.
 */

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var Event = mongoose.model('Event', new Schema({
    title: String,
    description: String,
    date: Date,
    logo: String
}));

exports.Event = Event;