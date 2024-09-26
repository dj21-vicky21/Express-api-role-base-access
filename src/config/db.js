const mongod = require("mongoose")
const dotenv = require("dotenv").config() 

const dbConnect =async ()=>{
    console.log("trying to connect DB...")
    try {
    const connect = await mongod.connect(process.env.DB_CONNECTION);
    console.info("database connected" ,connect.connection.host, connect.connection.name);
    } catch (error) {
        console.error("Error on DB connection",error)
        process.exit(1)
    }
}


module.exports= dbConnect