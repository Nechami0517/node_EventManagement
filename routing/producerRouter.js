const express = require('express');
const router = express.Router();
const { get,
    getByEmail,
    put,
    post,
    deleteProducer } = require('../controllers/producerController');

    
router.get('/Producer', get);
router.get('/Producer/:id', getByEmail);
router.put('/Producer/:id', put);
router.post('/Producer',  post);
router.delete('/Producer/:id', deleteProducer);


module.exports = router;
