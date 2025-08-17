import 'dotenv/config';
import express from "express";
import authRoute from "./Routes/authRoute"
import { errorHandler } from './Middleware/errorHandler';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("pong , working.");
})

app.use("/auth",authRoute);

app.post("/room", (req, res) => {

})

app.use(errorHandler);

app.listen(5000, () => {
    console.log("server running on port : 5000");
});
