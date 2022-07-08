const client = mqtt.connect("ws://localhost:3000/messages");
let socket = new WebSocket("ws://localhost:3000/messages");

socket.onopen = function (e) {
    console.log("WebSocket is connected");
};

socket.onmessage = function (message) {
    document.getElementById("info").innerHTML = message;
    console.log(message);
} 