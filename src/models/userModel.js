const mongod = require("mongoose");
const { roles } = require("../lib/utils");


const userSchema = new mongod.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: roles,
        default: "user"
    }
});

const User = mongod.model('User', userSchema)

module.exports = User;