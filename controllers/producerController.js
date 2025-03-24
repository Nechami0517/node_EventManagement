const Producer = require('../connection/producerConnection');

const get = async (req, res) => {
    try {
        const producers = await Producer.find({});
        console.log(producers + "///////////////////////////////////////////");
        if (!producers) {
            return res.status(404).send("Producer not found");
        }
        return res.status(200).send(producers);
    }
    catch {
        return res.status(500).send("Error");
    }
}

const getByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        if (!email) {
            return res.status(400).send("email is missing");
        }
        const producer = await Producer.findOne({ email: email });
        if (!producer) {
            return res.status(404).send("Producer not found");
        }
        return res.status(200).send(producer);
    }
    catch {
        return res.status(500).send("Error");
    }
}

const post = async (req, res) => {
    try {
        const email = req.body.email;
        const producer = await Producer.findOne({ email: email });
        if (producer) {
            return res.status(404).send("Producer already exist");
        }
        const newProducer = await Producer.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            description: req.body.descreption
        });
        await newProducer.save();
        return res.status(201).send(newProducer);
    }
    catch {
        return res.status(500).send("Error");
    }
}

const put = async (req, res) => {
    try {
        const email = req.params.email;
        console.log(email);
        console.log(req.params);

        if (!email) {
            return res.status(400).send("Id is missing");
        }
        if (email != req.body.email) {
            return res.status(400).send("Id is not match");
        }

        const producer = await Producer.findOneAndUpdate({ email: email }, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            description: req.body.descreption
        });
        if (!producer) {
            return res.status(404).send("Producer not found");
        }
        console.log("put3");

        return res.status(200).send(producer);
    }
    catch {
        return res.status(500).send("Error");
    }
}

const deleteProducer = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).send("Id is missing");
        }
        const producer = await Producer.findOne({ _id: id });
        if (!producer) {
            return res.status(404).send("Producer not found");
        }
        await Producer.deleteOne({ _id: id });
        return res.status(204).send("Producer deleted");
    }
    catch {
        return res.status(500).send("Error");
    }
}

module.exports = {
    get,
    getByEmail,
    put,
    post,
    deleteProducer
}
