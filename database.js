const mongoose = require("mongoose");

const database = async() => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connecting to ${dbConnection.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to ${error.message}`);
    }
};

module.exports = database;