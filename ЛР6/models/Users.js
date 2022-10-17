const {Schema, model} = require('mongoose')

const schema = new Schema({
    chatId:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: false,
    },
    name:{
        type: String,
        required: false,
    }
})

module.exports = model("Empty_Users", schema)
