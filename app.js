const path = require("path");
const express = require("express");

const defaultRoutes = require("./routes/default");
const mqttClient = require("./utils/mqtt");

const port = 3000;

const app = express();

const subscribeTopic = 'topic/logs';
const publishTopic = 'topic/ignition';

const expressWs = require("express-ws")(app);

expressWs.app.ws('/messages', (ws, req) => {});
const wss = expressWs.getWss('/messages');

const client = mqttClient.connect();

client.on('connect', () => {
    console.log(`Connected to mqtt`);
    mqttClient.subscribe(client, subscribeTopic);
    mqttClient.publish(client, publishTopic, "test");
});

client.on('message', (topic, payload) => {
    wss.clients.forEach((client) => {
        client.send(payload.toString());
    });
    console.log('Received Message:', topic, payload.toString());
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use('/', defaultRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});

app.use((error, req, res, next) => {
  res.status(500).render("500");
});

app.listen(process.env.PORT || port);


