const mqtt = require('mqtt');

const host = 'fancy-astronomer.cloudmqtt.com';
const port = '1883';
const username = 'ajpfbyzg';
const password = 'nG-m4eg_Uary';
const clientId = `aa_${Math.random().toString(16).slice(3)}`;
const connectUrl = `mqtt://${host}:${port}`;

function connect() {
    const client = mqtt.connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: username,
        password: password,
        reconnectPeriod: 1000,
    });
    return client;
}

function subscribe(client, topic) {
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`);
    });
}

function publish(client, topic, message) {
    client.publish(topic, message, { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error);
        }
    });
}

module.exports = {
    connect: connect,
    subscribe: subscribe,
    publish: publish
};