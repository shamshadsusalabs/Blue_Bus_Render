const express = require('express');
const router = express.Router();
const busController = require('../Controller/BusC'); // Adjust the path as necessary

// Route to create a new bus
router.post('/buses', busController.createBus);

// Route to get all buses
router.get('/buses', busController.getAllBuses);

// Route to get a bus by ID
router.get('/buses/:id', busController.getBusById);

// Route to update a bus by ID
router.put('/buses/:id', busController.updateBusById);

// Route to delete a bus by ID
router.delete('/buses/:id', busController.deleteBusById);


router.post('/buses/find-buses', busController.findBuses);
module.exports = router;
