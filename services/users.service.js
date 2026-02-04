"use strict";

const DbService = require('moleculer-db');
const MongooseAdapter = require('moleculer-db-adapter-mongoose');
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/moleculer-demo";

module.exports = {
    name: "users",
    
    mixins: [DbService],

    adapter: new MongooseAdapter(mongoUri),

    collection: "users",
    
    modelName: "User",

    schema:{
        name: {type: "string", required: true, minLength: 2},
        email :{type: "string", required:true},
        password :{type:"string", required: true}
    },

    actions:{
        create :{
            params: {
                name: "string|min:2",
                email: "email",
                password: "string|min:6"
             },
             async handler(ctx) {
        const user = await this.adapter.insert({
          name: ctx.params.name,
          email: ctx.params.email,
          password: ctx.params.password
        });
             return user;
            }
        }
    }
          
};
