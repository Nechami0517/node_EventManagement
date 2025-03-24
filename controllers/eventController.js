const Event = require('../connection/eventConnection');

const post = async (req, res) => {
    try {
        let event = await Event.create({
            name: req.body.name,
            emailProducer: req.body.emailProducer,
            price: req.body.price,
            description: req.body.description
        });
        await event.save();
        return res.status(201).send("created");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("status 500 : server error");
    }
}

const get = async (req, res) => {
    try {
        const events = await Event.find({});
        if (!events) {
            return res.status(404).send("no events");
        }
        return res.status(200).send(events);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("status 500 : server error");
    }
}

const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).send("no valid id");
        }
        const event = await Event.findOne({ _id: id });
        if (!event) {
            return res.status(404).send("no in database");
        }
        return res.status(200).send(event);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("status 500 : server error");
    }
}
const put = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`Received ID: ${id}`); // הדפסת ה-ID שהתקבל

        // if (isNaN(id)) {
        //     console.log("Invalid ID received"); // לוג במקרה של ID לא תקין
        //     return res.status(400).send("no valid id");
        // }
        console.log(`body: ${req.body}`); // הדפסת הבקשה שהתקבלה
        if (id != req.body._id) {
            console.log(`ID mismatch: received ${req.body._id}, expected ${id}`); // לוג במקרה של חוסר התאמה
            return res.status(400).send("id not match");
        }

        let event = await Event.findOne({ _id: id });
        console.log(`Event found: ${event}`); // לוג של האירוע שנמצא

        if (!event) {
            console.log("No event found in database"); // לוג במקרה שלא נמצא אירוע
            return res.status(404).send("no in database");
        }

        await Event.findOneAndUpdate({ _id: id },
            {
                id: id,
                name: req.body.name,
                emailProducer: req.body.emailProducer,
                description: req.body.description,
            });
        
        console.log(`Event updated: ${id}`); // לוג של עדכון האירוע
        return res.status(200).send("updated");
    }
    catch (err) {
        console.log("Error occurred:", err); // לוג במקרה של שגיאה
        return res.status(500).send("status 500 : server error");
    }
}


const deleteEvent = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).send("no valid id");
        }
        const event = await Event.findOne({ _id: id });
        if (!event) {
            return res.status(404).send("no in database");
        }
        await Event.deleteOne({ _id: id });
        return res.status(204).send("deleted");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("status 500 : server error");
    }
}

module.exports = { get, getById, put, post, deleteEvent };
