socket = new WebSocket(`ws://${window.location.host}/messages`);

const rightDiv = document.querySelector(".right");
const terminal = document.querySelector(".terminal");

const sleepBtn = document.getElementById("sleepBtn");

sleepBtn.addEventListener("click", () => {
    let message = "sleep message (TEST)"
    socket.send(message);
    const newMessageElement = document.createElement("p");
    newMessageElement.textContent = message;
    terminal.appendChild(newMessageElement);
    if (isUserNearBottom(terminal)) {
        terminal.scrollTop = newMessageElement.offsetTop;
    }
});