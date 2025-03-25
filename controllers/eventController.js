const Event = require('../connection/eventConnection');
const mongoose = require('mongoose');

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
        if (isNaN(id)) {
            return res.status(400).send("no valid id");
        }
        if (id != req.body.id) {
            return res.status(400).send("id not match");
        }
        let event = await Event.findOne({ _id: id });
        if (!event) {
            console.log(event);
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

        return res.status(200).send("updated");
    }
    
}


// const deleteEvent = async (req, res) => {
//     console.log("========delet event====================================")
//     try {
//         const id = parseInt(req.params.id);
//         if (isNaN(id)) {
//             return res.status(400).send("no valid id");
//         }
//         const event = await Event.findOne({ _id: id });
//         if (!event) {
//             return res.status(404).send("no in database");
//         }
//         await Event.deleteOne({ _id: id });
//         return res.status(204).send("deleted");
//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).send("status 500 : server error");
//     }
// }
const deleteEvent = async (req, res) => {
    console.log("========delet event====================================");
    console.log("Received request to delete event with ID:", req.params.id);
    
    try {
        const id = req.params.id; // אין צורך להמיר למספר
        if (!mongoose.Types.ObjectId.isValid(id)) { // בדוק אם המזהה תקין
            console.log("Invalid ID format:", id);
            return res.status(400).send("no valid id");
        }
        
        const event = await Event.findOne({ _id: id });
        if (!event) {
            console.log("No event found in database for ID:", id);
            return res.status(404).send("no in database");
        }
        
        await Event.deleteOne({ _id: id });
        console.log(`Event with ID ${id} deleted successfully.`);
        return res.status(204).send("deleted");
    } catch (err) {
        console.error("Error deleting event:", err); // השתמש ב-console.error להדפסת שגיאות
        return res.status(500).send("status 500 : server error");
    }
}

module.exports = { get, getById, put, post, deleteEvent };
