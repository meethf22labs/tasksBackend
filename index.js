const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const tasksRouter = require("./routes/tasks.routes");

// initialization
const app = express();
dotenv.config();

// entry point middleware
app.use(express.json());
app.use(cors());

// env var
const port = process.env.PORT;

// routing
app.use("/api/tasks", tasksRouter)

const startServer = () => {
    app.listen(port, console.log(`server running on PORT: ${port}`))
}
startServer();

