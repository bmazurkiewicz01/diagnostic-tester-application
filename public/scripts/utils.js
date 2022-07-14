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

function severityToInt(severity){
    let severityVal = 0;
    switch (severity) {
        case "INFO":
            severityVal = 2;
            break;
        case "WARNING":
            severityVal = 1;
            break;
        case "ERROR":
            severityVal = 0
            break;
        case "DEBUG":
            severityVal = 3
            break;
        default:
            break;
    }
    return severityVal; 
}

function getCount(parent, getChildrensChildren) {
    var relevantChildren = 0;
    var children = parent.childNodes.length;
    for (var i = 0; i < children; i++) {
        if (parent.childNodes[i].nodeType != 3) {
            if (getChildrensChildren)
                relevantChildren += getCount(parent.childNodes[i], true);
            relevantChildren++;
        }
    }
    return relevantChildren;
}

function isUserNearBottom(scrollContainer) {
    const threshold = 200;
    const position = scrollContainer.scrollTop + scrollContainer.offsetHeight;
    const height = scrollContainer.scrollHeight;
    return position > height - threshold;
}

function appendNewElement(parent, text, color)
{
    const newMessageElement = document.createElement("p");
    newMessageElement.textContent = text;
    newMessageElement.style.color = color;
    parent.appendChild(newMessageElement);

    return newMessageElement;
}

function sendMessage(terminal, message, log) {
    socket.send(message);
    const element = appendNewElement(terminal, log, "#8be98b");
    if (isUserNearBottom(terminal)) {
        terminal.scrollTop = element.offsetTop;
    }
}