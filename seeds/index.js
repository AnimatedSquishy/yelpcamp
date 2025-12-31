const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: "680a6c3fd27d91980d6cf9ea",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, ex a consectetur tincidunt, ipsum justo ullamcorper ligula, at mollis nunc justo vel mauris. Nulla facilisi. Sed vel tortor sed velit ornare tincidunt.",
      price: Math.floor(Math.random() * 20) + 10,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dyq8h16eb/image/upload/v1751385104/YelpCamp/ybr7as0yzecpav4dtkcq.jpg",
          filename: "YelpCamp/ybr7as0yzecpav4dtkcq",
        },
        {
          url: "https://res.cloudinary.com/dyq8h16eb/image/upload/v1751385104/YelpCamp/qjcddrhsjtgmgkix3gov.jpg",
          filename: "YelpCamp/qjcddrhsjtgmgkix3gov",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
