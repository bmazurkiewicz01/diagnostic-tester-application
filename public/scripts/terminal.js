const terminalInput = document.querySelector(".terminal-input");

const states = ["Sleep", "ACC", "FullOP"]

terminalInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        const command = terminalInput.value.split(" ");
        switch (command[0].toUpperCase()) {
            case "STATE":
                if (parseInt(command[1]) < 3 && parseInt(command[1]) > -1) {
                    const message = `expressjs///3///${parseInt(command[1])}\0`;
                    sendMessage(terminal, message, `[CLIENT] ${states[parseInt(command[1])]} message sent`);
                }
                else {
                    const element = appendNewElement(terminal, `Argument ${command[1]} is invalid`, "#cc0000");
                    if (isUserNearBottom(terminal)) {
                        terminal.scrollTop = element.offsetTop;
                    }
                }
                break;
            case "EXIT":
                const message = `expressjs///3///4\0`;
                sendMessage(terminal, message, "[CLIENT] exit message sent");
                break;

            case "RESET":
                if (command[1].toUpperCase() == "SOFT") {
                    const message = `expressjs///3///5\0`;
                    sendMessage(terminal, message, "[CLIENT] soft reset message sent");
                }
                else {
                    const element = appendNewElement(terminal, `Argument ${command[1]} is invalid`, "#cc0000");
                    if (isUserNearBottom(terminal)) {
                        terminal.scrollTop = element.offsetTop;
                    }
                }
                break;
            case "CLEAR":
                terminal.innerHTML = "";
                break;

            default:
                const element = appendNewElement(terminal, `Command ${terminalInput.value} not found`, "#cc0000");
                if (isUserNearBottom(terminal)) {
                    terminal.scrollTop = element.offsetTop;
                }
                break;
        }
        terminalInput.value = "";
    }
});