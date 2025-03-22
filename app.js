const express = require('express');
const bodyParser = require('body-parser');
const ProducerRouter = require('./routing/producerRouter');
const EventRouter = require('./routing/eventRouter');
const app= express();
const cors = require('cors');
app.use(cors());

const mongoose = require(`mongoose`);

mongoose.connect('mongodb://127.0.0.1:27017/EventsManagmentDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));




app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());

app.use(ProducerRouter);
app.use(EventRouter);

app.listen(27017, () => {
    console.log("listening on http://localhost:27017");

});
