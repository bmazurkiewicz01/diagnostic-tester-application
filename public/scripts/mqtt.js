socket = new WebSocket(`ws://${window.location.host}/messages`);

let count = window.count;
const leftDiv = document.querySelector(".left");
const mqttLogsDiv = document.querySelector(".mqttLogs");

socket.onopen = (e) => {
    console.log("WebSocket is connected");
};

socket.onmessage = (message) => {
    let activeModes = window.activeModes;
    while (getCount(mqttLogsDiv, false) > 1000) {
        mqttLogsDiv.firstChild.remove();
    }

    const messageAsString = message.data + "";

    const newMessageElement = document.createElement("p");
    const messageData = messageAsString.split("///");

    const severity = messageData[0];
    const time = messageData[1];
    const component = messageData[2];
    const msgData = messageData[3];

    newMessageElement.textContent = `[${severity}] ${time} ${component}: ${msgData}`;
    newMessageElement.style.color = toColorCode(severity);

    console.log(activeModes);
    if(activeModes[severityToInt(severity)] == true)
    {
        mqttLogsDiv.appendChild(newMessageElement);
        if (isUserNearBottom(leftDiv)) {
            leftDiv.scrollTop = newMessageElement.offsetTop;
        }
    }
}
