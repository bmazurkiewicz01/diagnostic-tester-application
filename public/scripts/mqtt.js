let socket = new WebSocket(`ws://${window.location.host}/messages`);

socket.onopen = (e) => {
    console.log("WebSocket is connected");
};

socket.onmessage = (message) => {
    const newMessage = document.createElement("p");
    newMessage.textContent = message.data;
    document.querySelector(".mqttLogs").appendChild(newMessage);
    console.log(message.data);
} 