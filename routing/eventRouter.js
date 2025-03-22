const express = require("express");
const router = express.Router();
const { get, getById, post, put, deleteEvent } = require('../controllers/eventController');


router.get("/event",get);

router.get("/event/:id",getById);

router.post("/event",post);

router.put("/event/:id",put);

router.delete("/event/:id",deleteEvent);

module.exports = router;