require("dotenv").config();
require("@dotenvx/dotenvx").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 4002;
const loginRoutes = require("./routes/loginRoutes");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ sucess: true, message: "Welcome to post-it server" });
});

app.use("/api/auth", loginRoutes);

app.use((req, res) => {
  res.status(404).json({ sucess: false, message: "ROUTE NOT FOUND" });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "POST-IT" });
    app.listen(PORT, () => {
      console.log(`App is running on PORT : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
