const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mongo-exercises", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect success!");
  } catch (err) {
    console.error("can't connect", err);
  }
}

module.exports = { connect };
