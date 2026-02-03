"use strict";

module.exports = {
    name: "users",
    actions : {
        list(){
            return [
                {id:1, name:"Maryam"},
                {id:2, name:"Morteza"},
                {id:3, name:"Ardavan"}
            ]
        },

        get(ctx){
            const id =ctx.params.id;
            return {id: id, name:"Maryam"};
        },

        create(ctx){
            const user= ctx.params;
            return {
                id: Date.now(),
                ...user
            };
        }
    }
};