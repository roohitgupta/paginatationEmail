const mongoose = require("mongoose")

const user = new mongoose.Schema({

    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true}
},
{
    versionKey: false,
    timeseries: true,
});

const user = mongoose.model("user", user);

module.exports = user;