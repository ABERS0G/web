const {Schema, model} = require('mongoose')

const schema = new Schema({
    element_name:{
        type: String,
        required: false,
        default: 'default_name'
    },
    product_name:{
        type: String,
        required: true
    },
    product_img:{
        type: String,
        required: true
    },
    person_name:{
        type: String,
        required: true
    },
    person_img:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    chatId:{
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    }
})

module.exports = model("Product", schema)
