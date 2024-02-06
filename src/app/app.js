import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from "../router/router.js";

const app = express();

//! Facilita debbuging
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

export default app;
