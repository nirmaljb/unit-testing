import { describe, it, expect, vi } from "vitest";
import { app } from "..";
import request from "supertest";
import { prismaClient } from "../__mocks__/db";
// import { userFn } from "../utils/users";

// console.log(Object.keys(prismaClient));

//deep mocking
vi.mock('../db');
vi.mock('../utils/users');

describe("testing the sum endpoint", () => {
    it("testing sum function using two positive number", async () => {
        // const response = await axios.post('http://localhost:3000/sum', {
        //     a: 10,
        //     b: 20
        // });
        // expect(response.data.response).toBe(30)

        prismaClient.request.create.mockResolvedValue({
            id: 1,
            a: 10,
            b: 20,
            answer: 30,
            type: "Sum"
        });

        vi.spyOn(prismaClient.request, "create");

        return await request(app)
        .post('/sum')
        .send({ a: 15, b: 20 })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(prismaClient.request.create).toHaveBeenCalledWith({
                data: {
                    a: 15,
                    b: 20,
                    answer: 35,
                    type: "Sum"
                }
            })
            expect(response.body.response).toBe(35);
            expect(response.body.id).toBe(1)
        })
    });

    // console.log(userFn());

    it("Should fail when inputs are too big", () => {
        return request(app)
        .post('/sum')
        .send({ a: 10000000000, b: 10000000000 })
        .expect(422)
        .then(response => {
            expect(response.body.message).toEqual("Inputs are too big");
        })
    })
});

describe("multiply endpoint", () => {
    it("testing multiply function using two positive number", () => {
        return request(app)
        .post('/multiply')
        .send({ a: 20, b: 30 })
        .expect(200)
        .then(response => {
            expect(response.body.result).toBe(600);
        })
    });
    
    it("testing multiply function by multiplying using 0", () => {
        return request(app)
        .post('/multiply')
        .send({ a: 0, b: 30 })
        .expect(200)
        .then(response => {
            expect(response.body.result).toBe(0);
        })
    });

    it("testing with high input values", async () => {
        const res = await request(app).post('/multiply').send({ a: 100000000, b: 0 })
        
        expect(res.statusCode).toBe(422);
        expect(res.body.message).toBe("Inputs are too big");
    })
});