const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const tasksRouter = require("./routes/tasks.routes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// initialization
const app = express();
dotenv.config();

// swagger 
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "task_app",
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ],
    },
    apis: ["./routes/tasks.routes.js"]
} 

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



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

