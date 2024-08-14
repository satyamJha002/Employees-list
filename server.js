const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
const path = require("path");
const bodyParser = require("body-parser");
const connectDb = require("./config/connectToDb");

const registerRoute = require("./routers/userRouters");
const employeeRoute = require("./routers/employeesRouters");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* cookieSession: helps to stores the session data on the client within a cookie without requiring any database/resources on the server side */
app.use(
  cookieSession({
    name: "satyam-jha",
    keys: [process.env.COOKIE_SECRET],
    httpOnly: true,
  })
);

app.use("/api/auth", registerRoute);
app.use("/api/employee", employeeRoute);

connectDb();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running at port number: ${port}`);
});
