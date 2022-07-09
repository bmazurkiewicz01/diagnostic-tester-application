let socket = new WebSocket("ws://localhost:3000/messages");

socket.onopen = (e) => {
    console.log("WebSocket is connected");
};

socket.onmessage = (message) => {
    const newMessage = document.createElement("p");
    newMessage.textContent = message;
    document.querySelector(".mqttLogs").appendChild(newMessage);
    console.log(message);
} 