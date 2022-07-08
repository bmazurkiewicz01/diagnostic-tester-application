const mqtt = require('mqtt');

const host = 'fancy-astronomer.cloudmqtt.com';
const port = '1883';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const subscribeTopic = '/topic/temperature';
const publishTopic = '/topic/temperature';

const connectUrl = `mqtt://${host}:${port}`;
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'ajpfbyzg',
  password: 'nG-m4eg_Uary',
  reconnectPeriod: 1000,
})

client.on('connect', () => {
  console.log(`Connected to ${host}`);
  client.subscribe([subscribeTopic], () => {
    console.log(`Subscribe to topic '${subscribeTopic}'`);
  });
  client.publish(publishTopic, 'Node.js MQTT test', { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
  });
})

client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString());
});
