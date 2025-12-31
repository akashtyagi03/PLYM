import dotenv from "dotenv";
dotenv.config();
import express from "express";
import type { Express, NextFunction, Request, Response } from "express";
import { buildStatusSchema, featureSchema, loginschema, signupschema } from "./zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import cors from "cors";
import { Buildstatus, Features, User } from "./db";
import z from "zod";
import { authmiddleware } from "./middleware";

const app: Express = express();
app.use(express.json());
app.use(cors());

// signup End point
app.post("/api/v1/signup", async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const validate = signupschema.safeParse(req.body);
    if (!validate.success) {
        return res.status(400).json({ error: validate.error });
    }

    try {
        const hashedpassword = await bcrypt.hash(password, 5);
        const user = await User.create({ username, email, password: hashedpassword });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string);
        res.json({
            message: "User signin successfully",
            token
        })
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// signin End point
app.post("/api/v1/signin", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const validate = loginschema.safeParse(req.body);
    if (!validate.success) {
        return res.status(400).json({ error: validate.error });
    }
    try {
        type usertype = {
            _id: string,
            email: string,
            password: string
        } | null;
        const user: usertype = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string);
        res.json({
            message: "User signin successfully",
            token
        })
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/v1/health", (req: Request, res: Response) => {
    res.json({ status: "ok", service: "plym-backend" });
});

// build status, and we can add middleware here later for auth
app.get("/api/v1/build-status", async (req: Request, res: Response) => {
    try {
        const response = await Buildstatus.find()
        res.json({
            response
        });
    } catch (err) {
        console.log("error coming", err)
        res.status(500).json({
            error: "Internal server error"
        })
    }
});

// updating build status only for admin
app.put("/api/v1/build-status", authmiddleware, async (req: Request, res: Response) => {
    try {
        const { frontend_progress, status } = req.body;
        const validate = buildStatusSchema.safeParse(req.body);
        if (!validate.success) {
            return res.status(400).json({ error: validate.error });
        }
        const response = await Buildstatus.findOneAndUpdate(
            {},
            { frontend_progress, status },
            { upsert: true, new: true }
        )
        res.json({
            "message": "successfully created build status",
            response
        })
    } catch (err) {
        console.log("error coming", err)
        res.status(500).json({
            error: "Internal server error"
        })
    }
})

// list all features
app.get("/api/v1/features", authmiddleware, async (req: Request, res: Response) => {
    try {
        const response = await Features.find()
        res.json({
            response
        })
    } catch (err) {
        console.log("error coming", err)
        res.status(500).json({
            error: "Internal server error"
        })
    }
})

// create features
app.post("/api/v1/features", authmiddleware, async (req: Request, res: Response) => {
    try {
        const { name, audience, state } = req.body
        const validate = featureSchema.safeParse(req.body);
        if (!validate.success) {
            return res.status(400).json({ error: validate.error });
        }
        const response = await Features.create({
            name,
            audience,
            state
        })
        res.json({
            response
        })
    } catch (err) {
        console.log("error coming", err)
        res.status(500).json({
            error: "Internal server error"
        })
    }
})

// update feature by feature id
app.put("/api/v1/features/:id", authmiddleware, async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, audience, state } = req.body

    try {
        const response = await Features.updateOne(
            { _id: id }, // filter
            {
                $set: {
                    name,
                    audience,
                    state
                }
            }
        )
        res.json({
            "message": "successfully updated feature",
            response
        })
    } catch (err) {
        console.log("error coming", err)
    }
})

// getting roadmap endpoint and we can add authmiddleware later
app.get("/api/v1/roadmap", (req: Request, res: Response) => {
    res.json({
        "now": "Core booking flow & café tools",
        "next": "Player profiles, rankings, live passes"
    })
})

async function main() {
    if (process.env.MONGODB_URL === undefined) {
        throw new Error("MONGODB_URL is not defined");
    }
    await mongoose.connect(process.env.MONGODB_URL!);
    app.listen(3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
}

main().catch((err) => {
    console.error("Failed to start server:", err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: "Internal server error",
        error: err.message
    });
});