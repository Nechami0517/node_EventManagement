const mongoose = require(`mongoose`);




const EventSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true
    // },
    emailProducer: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

const Event = mongoose.model(`Event`, EventSchema);
module.exports = Event;