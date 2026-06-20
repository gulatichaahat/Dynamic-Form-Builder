console.log("THIS IS MY SERVER.JS FILE");

const authRoutes = require("./routes/authRoutes");

const formRoutes = require("./routes/formRoutes");

const responseRoutes = require("./routes/responseRoutes");

const analyticsRoutes = require("./routes/analyticsRoutes");

const qrRoutes = require("./routes/qrRoutes");

const exportRoutes = require("./routes/exportRoutes");

const uploadRoutes = require("./routes/uploadRoutes");

require("dotenv").config();

const express = require("express");

const http = require("http");

const { Server } = require("socket.io");

const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {

    cors: {

        origin: "*",

        methods: ["GET", "POST"]

    }

});

app.use(cors());

app.use(express.json());

app.use(

"/uploads",

express.static("uploads")

);

app.get("/", (req, res) => {

    res.send("Server Working");

});

app.get("/test", (req, res) => {

    console.log("TEST ROUTE HIT");

    res.send("TEST WORKING");

});

app.use("/api/auth", authRoutes);

app.use(

    "/api/forms",

    formRoutes

);

app.use(

"/api/responses",

responseRoutes

);

app.use(

"/api/analytics",

analyticsRoutes

);

app.use(

    "/api/qr",

    qrRoutes

);

app.use(

"/api/export",

exportRoutes

);

app.use(

"/api/upload",

uploadRoutes

);

io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    socket.on("disconnect", () => {

        console.log("User Disconnected");

    });

});

connectDB();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    console.log(

        "MY EXPRESS SERVER IS RUNNING ON PORT",

        PORT

    );

});

module.exports = {

    io

};
