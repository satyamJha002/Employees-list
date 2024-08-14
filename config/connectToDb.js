const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDb is connected successfully ${mongoose.connection.host}`
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDb;
