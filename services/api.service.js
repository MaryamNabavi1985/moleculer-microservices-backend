"use strict";

const ApiGateway = require("moleculer-web");

module.exports = {
    name: "api",

    mixins: [ApiGateway],
    settings :{
        port : process.env.PORT || 3000,
        routes :[
            {
    
                path : "/api",

                aliases : {
                    "GET /hello" : "greeter.hello",

                    "GET /users" : "users.list",
                    "GET /users/:id" : "users.get",
                    "POST /users" : "users.create",

                    "POST auth/login": "auth.login",
                    "POST auth/register": "auth.register"
                },

                bodyParsers: {
                    json: true,
                }
             }
        ]
    }
}