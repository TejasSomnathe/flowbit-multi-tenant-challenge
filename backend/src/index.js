import dotenv from "dotenv";
import app from "./app.js";

import connectDB from "./db/index.js";
dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`server is running on the port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("error connecting to the database ", error);
  });
