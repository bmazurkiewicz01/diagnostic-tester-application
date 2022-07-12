let socket = new WebSocket(`wss://${window.location.host}/messages`);

const rightDiv = document.querySelector(".right");
const terminal = document.querySelector(".terminal");

const sleepBtn = document.getElementById("sleepBtn");
const modeBtn = document.getElementById("modeBtn");

sleepBtn.addEventListener("click", () => {
    let message = "sleep message (TEST)"
    socket.send(message);
    const newMessageElement = document.createElement("p");
    newMessageElement.textContent = message;
    terminal.appendChild(newMessageElement);
    if (isUserNearBottom(terminal)) {
        terminal.scrollTop = newMessageElement.offsetTop;
    }
})

const modes = ["ERROR","WARNING", "INFO", "DEBUG"];
window.activeModes = [true, false, false, false];
window.count = 0;
let currentMode = modes[window.count];

modeBtn.addEventListener("click", () => {
    if(window.count == 3)
        window.count = -1;
    currentMode = modes[++window.count];

    switch(currentMode)
    {
        case "ERROR":
            window.activeModes = [true, false, false, false];
            break;
        case "WARNING":
            window.activeModes = [true, true, false, false];
            break;
        case "INFO":
            window.activeModes = [true, true, true, false];
            break;
        case "DEBUG":
            window.activeModes = [true, true, true, true];
            break;
    }
    const newMessageElement = document.createElement("p");
    newMessageElement.textContent = "LOG MODE: " + currentMode;
    console.log(currentMode)
    terminal.appendChild(newMessageElement);
    if (isUserNearBottom(terminal)) {
        terminal.scrollTop = newMessageElement.offsetTop;
    }
})