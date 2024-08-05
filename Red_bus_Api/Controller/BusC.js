const Bus = require('../Schema/Bus'); // Adjust the path as necessary

// Create a new bus
exports.createBus = async (req, res) => {
  try {
    const bus = new Bus(req.body);
    const savedBus = await bus.save();
    res.status(201).json(savedBus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all buses
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single bus by ID
exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (bus) {
      res.status(200).json(bus);
    } else {
      res.status(404).json({ message: 'Bus not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a bus by ID
exports.updateBusById = async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedBus) {
      res.status(200).json(updatedBus);
    } else {
      res.status(404).json({ message: 'Bus not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a bus by ID
exports.deleteBusById = async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);
    if (deletedBus) {
      res.status(200).json({ message: 'Bus deleted successfully' });
    } else {
      res.status(404).json({ message: 'Bus not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find buses by pickupLocation, dropLocation, and date
exports.findBuses = async (req, res) => {
  try {
    // Log the entire request body
    console.log('Request body:', req.body);

    // Extract parameters from the request body with the correct names
    const { pickupLocation, dropLocation, date } = req.body;

    // Log the parameters extracted from the request body
    console.log('Extracted parameters:', { pickupLocation, dropLocation, date });

    // Validate input
    if (!pickupLocation || !dropLocation || !date) {
      console.log('Validation failed: All fields are required');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Perform the query
    console.log('Performing query...');
    const query = {
      $and: [
        {
          $or: [
            { pickUpLocation: { $regex: new RegExp(`^${pickupLocation}$`, 'i') } },
            {
              $expr: {
                $gte: [
                  {
                    $size: {
                      $filter: {
                        input: '$subLocations',
                        cond: { $regexMatch: { input: '$$this.location', regex: new RegExp(`^${pickupLocation}$`, 'i') } }
                      }
                    }
                  },
                  1
                ]
              }
            }
          ]
        },
        { dropLocation: { $regex: new RegExp(`^${dropLocation}$`, 'i') } },
        { pickUpDate: new Date(date) } // Ensure this matches the date format in your schema
      ]
    };

    console.log('Query:', query);
    const buses = await Bus.find(query);

    // Log the query results
    console.log('Query results:', buses);

    // Return results
    return res.status(200).json(buses);
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
