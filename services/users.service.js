"use strict";

module.exports = {
    name: "users",

    actions : {
        list:{
            handler(){
                return [
                {id:1, name:"Maryam"},
                {id:2, name:"Morteza"},
                {id:3, name:"Ardavan"}
            ]
            }
          
        },

             get: {
            params: {
                id: "number|convert"
            },
            handler(ctx) {
                return {
                    id: ctx.params.id,
                    name: "Maryam"
                };
            }
        },
        create:{
            params: {
                name: "string|min:3"
            },  
            handler(ctx){
                 return {
                id: Date.now(),
                name: ctx.params.name
            };
            }  
           
        }
    }
};
