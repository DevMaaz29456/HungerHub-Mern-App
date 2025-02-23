const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://gofood:gofood123@cluster0.bv4hb.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully!");

    // Fetch food_items collection data
    const foodItems = await mongoose.connection.db
      .collection("food_items")
      .find({})
      .toArray();

    const foodCategories = await mongoose.connection.db
      .collection("foodCategory")
      .find({})
      .toArray();

    if (foodItems.length > 0) {
      global.food_items = foodItems;
      global.foodCategory = foodCategories;
      console.log("Fetched food items and categories successfully!");
    } else {
      console.log("No food items found in the database.");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = mongoDB;
