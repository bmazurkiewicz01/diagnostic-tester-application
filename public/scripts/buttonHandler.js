socket = new WebSocket(`ws://${window.location.host}/messages`);

const sleepBtn = document.getElementById("sleepBtn");

sleepBtn.addEventListener("click", () => {
    socket.send("sleep message (TEST)");
});