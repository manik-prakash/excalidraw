import 'dotenv/config';
import express from "express";
import authRoute from "./Routes/authRoute"
import { errorHandler } from './Middleware/errorHandler';
import { verify } from './Middleware/auth';
import { resourceUsage } from 'process';
import prisma from '@repo/db/client';
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("pong , working.");
})

app.use("/auth", authRoute);

app.post("/room", verify, async (req, res) => {

    const { userID, slug } = req.body;

    if (!slug) {
        return res.status(401).json({ message: "enter a valid name." });
    }

    const result = await prisma.room.create({
        data: {
            slug: slug,
            ownerId: userID
        }
    });

    res.json({
        message: "room created",
        roomId: result.id
    })

})

app.use(errorHandler);

app.listen(5000, () => {
    console.log("server running on port : 5000");
});
