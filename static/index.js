var  socket = io.connect("http://192.168.0.107:5000");

function connect(){

    socket.on('connect', function(){
    socket.send("User Connected!");
    });
}

function updateScrollbar(){
// puts the scrollbar to the bottom area
        var messageBody = document.querySelector('#chat-content');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
}

function filterMessage(name, msg){
var $layout = $('<p></p>');
var d = new Date();
let hour = d.getHours();
let minutes = d.getMinutes();
let time = hour + ":" + minutes;
if(name == $('#user').val()){
 content = '<div class="media media-chat media-chat-reverse">' +
'<div class="media-body"><p>'+ msg +'</p></div></div>';
}
else {
 content = '<div class="media media-chat">' +
'<div class="media-body"><p class="meta"><small>'+ name +'</small></p><p>'+ msg +'</p></div></div>';
}

return content
}


function updateMessageDisplay(){

    socket.on('appendMessage', function(name, msg){
    var $layout = $(filterMessage(name, msg));
    //var layout = name + ": " + msg;
    $('#chat-content').append($layout);
    updateScrollbar();
    });
}



//jquery
// Adds message in message box
$(document).ready(function(){
    connect();
    // Updates the message display to the latest message
    updateScrollbar();
// on Send Button click
    $("#send_Btn").on('click', function(){
    socket.emit('sendMessage',$('#user').val(),$('#msg_Box').val());
    $('#msg_Box').val('');
    });

// on Press Enter
    $("#msg_Box").on('keypress', function(event){
    if (event.key == "Enter") {
    socket.emit('sendMessage',$('#user').val(),$('#msg_Box').val());
    $('#msg_Box').val('');
    }
    });

    updateMessageDisplay();


})


