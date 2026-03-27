const mongoose = require("mongoose");
const Trip = require("./travlr");

// get seed data from trips.json
const seedData = require("../../data/trips.json");

const host = process.env.DB_HOST || "127.0.0.1";
const dbURI = `mongodb://${host}/travlr`;

const seedDB = async () => {
  await mongoose.connect(dbURI);
  console.log(`Mongoose connected to ${dbURI}`);
  await Trip.deleteMany({});
  await Trip.insertMany(seedData);
  console.log("Database seeded with trip data");
};

seedDB()
  .then(() => {
    console.log("Seeding complete");
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding database: ", err);
    process.exit(1);
  });
