// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URI stored in an environment variable
    await mongoose.connect(process.env.MONGO_URI, {
      // Options to deal with MongoDB's updated URL string parser and connection management engine
      //useNewUrlParser: true,
     // useUnifiedTopology: true,
    });

    // Log a message indicating successful connection
    console.log('MongoDB connected');
  } catch (err) {
    // Log any errors that occur during the connection attempt
    console.error(err.message);
    // Exit the process with failure (status code 1) if connection fails
    process.exit(1);
  }
};

// Export the connectDB function so it can be used in other parts of the application
module.exports = connectDB;
