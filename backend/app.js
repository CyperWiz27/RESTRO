import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./db/dbConnection.js";

const app = express();
dotenv.config({ path: "./config/config.env" });



app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    methods: ["POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", reservationRouter);
// app.get("/", (req, res, next)=>{return res.status(200).json({
//   success: true,
//   message: "HELLO WORLD AGAIN"
// })})

dbConnection();

app.use(errorMiddleware);

app.listen(process.env.PORT, ()=>{
    console.log(`SERVER HAS STARTED AT PORT ${process.env.PORT}`);
})

