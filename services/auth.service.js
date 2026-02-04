const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


module.exports= {
    name: "auth",

    settings: {
        JWT_SECRET: process.env.JWT_SECRET || "super-secret-key"
    },

    actions :{

        register: {
            params: {
                name: "string",
                email: "email",
                password: "string|min:6"
            },

            async handler(ctx) {
                const {name, email, password} = ctx.params;

                const existing = await ctx.call("users.find" ,{
                    query:{email}
                });

                if(existing.length > 0){
                    throw new Error("User already exists");
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                const user = await ctx.call("users.create",{
                    name,
                    email,
                    password: hashedPassword
                });

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
            }
        },

        login:{
            params:{
                email: "email",
                password: "string"
            },
            async handler(ctx){
                const {email, password} = ctx.params;

                const users = await ctx.call("users.find",{
                    query: {email}
                });

                if (users.length === 0){
                    return new Error("Invalid credentials");
                }

                const user = user[0];
                const isValid = await bcrypt.compare(password , user.password);

                if(!isValid){
                    throw new Error("Invalid credentials");
                }

                const token = jwt.sign(
                    {  id:user._id, email: user.email  },
                    this.settings.JWT_SECRET,
                    {expiresIn: "1d"}
                );

                return token
            }
        }
    }
}