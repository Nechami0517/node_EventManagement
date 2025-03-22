
const mongoose = require(`mongoose`);



const producerSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
})

const Producer = mongoose.model(`Producer`, producerSchema);
module.exports = Producer;