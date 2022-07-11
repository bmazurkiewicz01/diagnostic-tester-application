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
    const threshold = 100;
    const position = scrollContainer.scrollTop + scrollContainer.offsetHeight;
    const height = scrollContainer.scrollHeight;
    return position > height - threshold;
}