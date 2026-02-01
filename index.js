require("dotenv").config();

const path = require("path");

const {ServiceBroker} = require("moleculer");

const broker = new ServiceBroker({
    logger: true
});

broker.loadServices(path.join(__dirname, "services"));

broker.start()
    .then(() => console.log(`API Gateway running on port ${process.env.PORT}`));
  