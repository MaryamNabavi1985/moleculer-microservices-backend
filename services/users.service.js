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
        name: {
            type: String,
            required: true,
            minLength: 2
        }
    },

    actions:{
        create :{
            params: {
                name: "string|min:2"
            },
            async handler(ctx){
                return this.adapter.insert({
                    name: ctx.params.name
                });
            }
        }
    }
          
};
