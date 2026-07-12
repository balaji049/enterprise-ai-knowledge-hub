import express from "express";
import cors from "cors";
import morgan from "morgan";

import conversationRoutes from "./routes/conversation.routes.js";
import routes from "./routes/index.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

/* =========================================
   Middlewares
========================================= */

app.use(cors({

    origin: "http://localhost:3000",


    credentials: true

}));

app.use(express.json());

app.use(express.urlencoded({

    extended: true

}));

app.use(morgan("dev"));

/* =========================================
   Health Check
========================================= */

app.get(

    "/",

    (request, response) => {

        response.json({

            success: true,

            message: "Enterprise AI Knowledge Hub API"

        });

    }

);

/* ============================
   Routes
============================ */

app.use("/api", routes);

app.use(

     "/api/conversations",

     conversationRoutes

);

/* ============================
   Error Handling
============================ */

app.use(notFound);
app.use(errorHandler);

export default app;