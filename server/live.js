/**
 * Created by hugopozzoli on 23/12/15.
 */

var ss      = require('socket.io-stream'),
    fs      = require('fs'),
    mkdirp  = require('mkdirp');

var Live = {
    listen: function (io, socket) {

        ss(socket).on('File:Upload', function(stream, data) {
            var path = __dirname + '/..',
                dir = path + '/public/uploads';

            mkdirp(dir, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    var filename = '/public/uploads/' + Date.now() + '-' + Math.floor((Math.random()*1000)+1) + '.' + data.format;

                    // Create a stream pipe to start uploading
                    stream.pipe(fs.createWriteStream(path + filename));

                    // Upload complete event
                    stream.on('end', function() {

                        // Send to the client the uploaded filename
                        socket.emit('File:Uploaded', {
                            path: filename
                        });
                    });
                }
            });
        });

    }
};

exports.live = Live;