let socket = new WebSocket(`wss://${window.location.host}/messages`);

function toColorCode(severity) {
    let colorCode = "";
    switch (severity) {
        case "INFO":
            colorCode = "#8be98b";
            break;
        case "WARNING":
            colorCode = "#fefe71";
            break;
        case "ERROR":
            colorCode = "#cc0000";
            break;
        case "DEBUG":
            colorCode = "#5fa6ec";
            break;
        default:
            break;
    }
    return colorCode;
}

socket.onopen = (e) => {
    console.log("WebSocket is connected");
};

socket.onmessage = (message) => {
    const messageAsString = message.data + "";

    const newMessageElement = document.createElement("p");
    const splitedMsg = messageAsString.split("///");

    const severity = splitedMsg[0];
    const time = splitedMsg[1];
    const component = splitedMsg[2];
    const msgData = splitedMsg[3];

    newMessageElement.textContent = `[${severity}] ${time} ${component}: ${msgData}`;
    newMessageElement.style.color = toColorCode(severity);

    document.querySelector(".mqttLogs").appendChild(newMessageElement);
} 