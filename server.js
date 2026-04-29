const express = require("express");
const mongoose = require("mongoose");
const url_model = require("./models/shorturl.js");
const app = express();

const PORT = 5000;
const LOCALHOST_IP = "127.0.0.1";
const MONGO_URI = `mongodb://${LOCALHOST_IP}:27017/Url_Shortner`;

const connectMongoDB = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Successfully Connected to MongoDB !!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const urlLists = await url_model.find();
  res.render("index", { shorturls: urlLists });
});

app.post("/shorturls", async (req, res) => {
  await url_model.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.listen(PORT, () => {
  connectMongoDB(MONGO_URI);
  console.log(`Server is running on PORT ${PORT}`);
});
