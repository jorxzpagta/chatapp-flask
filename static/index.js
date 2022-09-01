var  socket = io.connect("http://localhost:5000");

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


function updateMessageDisplay(){

    socket.on('message', function(data){
    $('#chat-content').append($('<p>').text(data));
    updateScrollbar();
    });

    socket.on((arg1) => {
    $('#chat-content').append($('<p>').text(arg1)); // 1
    updateScrollbar();
    });

}

//jquery
// Adds message in message box
$(document).ready(function(){
    connect();

// on Send Button click
    $("#send_Btn").on('click', function(){
    socket.send($('#username').val() + ": " + $('#msg_Box').val());
    $('#msg_Box').val('');
    });

// on Press Enter
    $("#msg_Box").on('keypress', function(event){
    if (event.key == "Enter") {
    socket.emit('sendMessage', $('#username').val() + ": " + $('#msg_Box').val());
    $('#msg_Box').val('');
    }
    });

    updateMessageDisplay();


})


