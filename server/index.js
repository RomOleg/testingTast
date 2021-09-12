require("dotenv").config();
const routRouter = require("./routes/rout.routes");
const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Access-Control-Allow-Headers"
    );
    next();
});
app.use("/api", routRouter);

app.listen(PORT, () => console.log(`Server run is ${PORT}`));
