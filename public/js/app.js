var name = getQueryVariable('name');
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join ' + room);

socket.on('connect', function () {
    console.log('Connected to socket.io server!');
});

socket.on('message', function (message) {
    var timestamp = moment.utc(message.timestamp);

    console.log('New message:');
    console.log(message.text);

    jQuery('.messages').append('<p><strong>' + timestamp.local().format('h:mm a') + ': </strong>' + message.text + '</p>');
});

var $form = jQuery('#message-form');

$form.on('submit', function (event) {
    event.preventDefault();

    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        text: $message.val()
    });

    $message.val('');
});