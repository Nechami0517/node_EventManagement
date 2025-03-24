const express = require('express');
const router = express.Router();
const { get,
    getByEmail,
    put,
    post,
    deleteProducer } = require('../controllers/producerController');

    
router.get('/Producer', get);
router.get('/Producer/:email', getByEmail);
router.put('/Producer/:email', put);
router.post('/Producer',  post);
router.delete('/Producer/:email', deleteProducer);


module.exports = router;
