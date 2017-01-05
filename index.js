var config = require('./config/config.json');
var dash_button = require('node-dash-button');
var exec = require('child_process').exec;

console.log('If ' + config.address + ' is pressed, mac goes to sleep');

var dash = dash_button(config.address);
dash.on("detected", function() {
    console.log(config.address + ' is pressed.');
    var child = exec('pmset sleepnow', function(error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
});
