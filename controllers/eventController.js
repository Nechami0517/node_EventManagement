const Event = require('../connection/eventConnection');


const post = async (req, res) => {
    try {

        // if (req.body.id) {
        //     res.send(400).send("id not match");
        //     return;
        // }
        // const events = await Event.find({});

        // let event = await Event.findOne({ id: id });
        // if (event) {
        //     res.status(404).send("already in database");
        //     return;
        // }
        let event = await Event.create({
            //id: id,
            name: req.body.name,
            producerId: req.body.producerId,
            price: req.body.price,
            description: req.body.description
        });
        await event.save();
        res.status(201).send("created");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("status 500 : server error");
    }
}


const get = async (req, res) => {
    try {
        const events = await Event.find({});
        if (!events) {
            res.status(404);
            res.send("no events");
            return;
        }
        res.status(200);
        res.send(events);
    }
    catch (err) {
        console.log(err);

        res.status(500).send("status 500 : server error");
    }
}

const getById = async (req, res) => {

    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).send("no valid id");
            return;
        }
        const event = await Event.findOne({ id: id });
        if (!event) {
            res.status(404).send("no in database");
            return;
        }
        res.status(200).send(event);
    }
    catch (err) {
        console.log(err);
        res.send(500).send("status 500 : server error");
    }
}

const put = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).send("no valid id");
            return;
        }
        if (id != req.body.id) {
            res.send(400).send("id not match");
            return;
        }
        let event = await Event.findOne({ id: id });
        if (!event) {
            console.log(event);
            res.status(404).send("no in database");
            return;
        }
        await Event.findOneAndUpdate({ id: id },
            {
                id: id,
                name: req.body.name,
                producerId: req.body.producerId,
                description: req.body.description,
            });
        res.status(200).send("updated");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("status 500 : server error");
    }
}

const deleteEvent = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).send("no valid id");
            return;
        }
        const event = await Event.findOne({ id: id });
        if (!event) {
            res.status(404).send("no in database");
            return;
        }
        await Event.deleteOne({ id: id });
        res.status(204).send("deleted");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("status 500 : server error");
    }
}



module.exports = { get, getById, put, post, deleteEvent };