const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    name: {
        type: "String",
    },
    email: {
        type: "String",
        unique: true
    },
    mobile: {
        type: "String",
    },
    password: {
        type: "String",
    }
});

module.exports = mongoose.model("Users", UsersSchema)