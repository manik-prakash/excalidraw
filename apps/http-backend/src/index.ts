import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "@repo/db/client";
const app = express();
const secret = process.env.JWT_SECRET || "super_secret_token";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/ping", (req, res) => {
    res.send("pong , working.");
})

app.post("/signin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    // Simulating user lookup
    const user = {
        email: "",
        password: "$2a$10$EIX/5z1Zb7Q8e1f5j3k9UO0m6Y4y5z5Zb7Q8e1f5j3k9UO0m6Y4y5z", // hashed password for "password123"
    };
    if (user.email !== email) {
        return res.status(401).send("Invalid email or password.");
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send("Invalid email or password.");
    }
    const payload = jwt.sign({ userID: 1, email: user.email }, secret, { expiresIn: "1h" });
    res.status(200).json({

        message: "Login successful",
        token: payload,
    });

})

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
        return res.status(400).send("Username and password and email are required.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const result = await prisma.user.create({
        data: {
            username: username,
            email: email,
            passwordHash: hash
        }
    })

    // const payload = jwt.sign({ userID: result.userId, email: result.email }, secret, { expiresIn: "1h" });
    console.log(result);

    res.status(200).json({
        message: "User created successfully",
        token: "csbvcsubsucbu",
    });
})

app.post("/room", (req, res) => {

})


app.listen(5000);
