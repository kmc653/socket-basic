var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join ' + room);

socket.on('connect', function () {
    console.log('Connected to socket.io server!');
});

socket.on('message', function (message) {
    var timestamp = moment.utc(message.timestamp);
    var $messages = jQuery('.messages');

    console.log('New message:');
    console.log(message.text);

    $messages.append('<p><strong>' + message.name + ' ' + timestamp.local().format('h:mm a') + '</strong></p>');
    $messages.append('<p>' + message.text + '</p>');

});

var $form = jQuery('#message-form');

$form.on('submit', function (event) {
    event.preventDefault();

    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        name: name,
        text: $message.val()
    });

    $message.val('');
});