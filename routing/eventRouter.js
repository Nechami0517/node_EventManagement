const express = require("express");
const router = express.Router();
const { get, getById, post, put, deleteEvent } = require('../controllers/eventController');

// Middleware to log request and response
const logMiddleware = (req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`);
    
    // Store the original send method
    const originalSend = res.send;

    // Override res.send to log the response
    res.send = function (body) {
        console.log(`Response Status: ${res.statusCode}, Response Body: ${body}`);
        originalSend.call(this, body); // Call the original send method
    };

    next(); // Proceed to the next middleware or route handler
};

// Apply middleware to all routes
//router.use(logMiddleware);

router.get("/event", get);
router.get("/event/:id", getById);
router.post("/event", post);
router.put("/event/:id", put);
router.delete("/event/:id", deleteEvent);

module.exports = router;
