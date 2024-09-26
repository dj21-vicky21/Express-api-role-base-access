const express = require("express");
const dbConnect = require("./config/db");
const authRoutes = require("./routes/authroutes")
const userRoutes = require("./routes/userRoutes")

const app = express();

//connect DB
dbConnect()

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// auth routes
app.use("/api/auth", authRoutes)

// user routes
app.use("/api/users", userRoutes)

const port = parseInt(process.env.PORT) || 5002;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});