let socket = new WebSocket(`wss://${window.location.host}/messages`);

const rightDiv = document.querySelector(".right");
const terminal = document.querySelector(".terminal");

const sleepBtn = document.getElementById("sleepBtn");
const accBtn = document.getElementById("accBtn");
const fullOpBtn = document.getElementById("fullOpBtn");
const softResetBtn = document.getElementById("softResetBtn");
const modeBtn = document.getElementById("modeBtn");

sleepBtn.addEventListener("click", () => {
    const message = "expressjs///3///0\0";
    sendMessage(terminal, message, "[CLIENT] Sleep message sent");
    
});

accBtn.addEventListener("click", () => {
    const message = "expressjs///3///1\0";
    sendMessage(terminal, message, "[CLIENT] ACC message sent");
});

fullOpBtn.addEventListener("click", () => {
    const message = "expressjs///3///2\0";
    sendMessage(terminal, message, "[CLIENT] FullOP message sent");
});

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
    const element = appendNewElement(terminal, "[CLIENT] LOG MODE: " + currentMode, "#8be98b");
    if (isUserNearBottom(terminal)) {
        terminal.scrollTop = element.offsetTop;
    }
})