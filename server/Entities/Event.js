/**
 * Created by hugopozzoli on 22/12/15.
 */

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var EventSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    logo: String
});

exports.Event = mongoose.model('Event', EventSchema);