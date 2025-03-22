const Producer = require('../connection/producerConnection');

const get = async (req, res) => {
    try {
        const producers = await Producer.find({});
        console.log(producers + "///////////////////////////////////////////");
        if (!producers) {
            res.status(404);
            res.send("Producer not found");
            return;
        }
        res.status(200);
        res.send(producers);
    }
    catch {
        res.status(500);
        res.send("Error");
    }
}

const getByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        if (!email) {
            res.status(400);
            res.send("email is missing");
            return;
        }
        const producer = await Producer.findOne({ email: email });
        if (!producer) {
            res.status(404);
            res.send("Producer not found");
            return;
        }
        res.status(200);
        res.send(producer);
    }
    catch {
        res.status(500);
        res.send("Error");
    }
}



const post = async (req, res) => {
    try {
         const email = parseInt(req.body.email);
        // if (!id) {
        //     res.status(400);
        //     res.send("Id is missing");
        //     return;
        // }
        // if (id != req.body.id) {
        //     console.log(id);
        //     console.log(req.body);
        //     res.status(400);
        //     res.send("Id is not match");
        //     return;
        // }
        const producer = await Producer.findOne({ email: email });
        if (producer) {
            res.status(404);
            res.send("Producer already exist");
            return;
        }
        const newProducer = await Producer.create({
            //id: id,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            description: req.body.descreption
        })
        await newProducer.save();
        res.status(201);
        res.send(newProducer);
    }
    catch {
        res.status(500);
        res.send("Error");
    }
}


const put = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            req.status(400);
            res.send("Id is missing");
            return;
        }
        if (id != req.body.id) {
            res.status(400);
            res.send("Id is not match");
            return;
        }
        const producer = await Producer.findOneAndUpdate({ id: id }, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            description: req.body.descreption
        })
        if (!producer) {
            res.status(404);
            res.send("Producer not found");
            return;
        }
        res.status(200);
        res.send(producer);
    }
    catch {
        res.status(500);
        res.send("Error");
    }
}
const deleteProducer = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            res.status(400);
            res.send("Id is missing");
            return;
        }
        const producer = await Producer.findOne({ id: id });
        if (!producer) {
            res.status(404);
            res.send("Producer not found");
            return;
        }
        await Producer.deleteOne({ id: id });
        res.status(204);
        res.send("Producer deleted");
    }
    catch {
        res.status(500);
        res.send("Error");
    }
}
module.exports = {
    get,
    getByEmail,
    put,
    post,
    deleteProducer
}
