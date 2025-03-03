import express, { NextFunction } from "express";
import { prismaClient } from "./db";
import { vi } from "vitest";

export const app = express();
app.use(express.json());

const inputValidator = (req: any, res: any, next: NextFunction) => {
    const { a, b } = req.body;
    if(a > 10000000 || b > 10000000) {
        return res.status(422).json({ message: 'Inputs are too big' });
    }

    next();
};

app.use(inputValidator);

app.post('/sum', async (req, res) => {
    const { a, b } = req.body;
    const sum = a + b;

    const request = await prismaClient.request.create({
        data: {
            a: a,
            b: b,
            answer: sum,
            type: "Sum"
        }
    });
    
    console.log(request);

    res.json({ response: sum, id: request.id });
});

app.post('/multiply', async (req, res) => {
    const { a, b } = req.body;
    const multiply = a * b;

    await prismaClient.request.create({
        data: {
            a,
            b,
            answer: multiply,
            type: "Multiply"
        }
    });

    res.json({ result: multiply });
})
