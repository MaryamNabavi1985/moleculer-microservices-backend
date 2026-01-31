const {ServiceBroker} = require("moleculer");

const broker = new ServiceBroker({
    logger: true
});

broker.loadService("./services/greeter.service.js");

broker.start()
    .then(() => broker.call("greeter.hello"))
    .then(res => console.log(res));