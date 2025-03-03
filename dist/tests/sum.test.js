"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const __1 = require("..");
const supertest_1 = __importDefault(require("supertest"));
// console.log(Object.keys(prismaClient));
//deep mocking
vitest_1.vi.mock('../db', () => {
    return {
        prismaClient: {
            request: {
                create: vitest_1.vi.fn()
            }
        }
    };
});
(0, vitest_1.describe)("testing the sum endpoint", () => {
    (0, vitest_1.it)("testing sum function using two positive number", () => __awaiter(void 0, void 0, void 0, function* () {
        // const response = await axios.post('http://localhost:3000/sum', {
        //     a: 10,
        //     b: 20
        // });
        // expect(response.data.response).toBe(30)
        return yield (0, supertest_1.default)(__1.app)
            .post('/sum')
            .send({ a: 10, b: 20 })
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
            (0, vitest_1.expect)(response.body.response).toBe(30);
        });
    }));
    (0, vitest_1.it)("Should fail when inputs are too big", () => {
        return (0, supertest_1.default)(__1.app)
            .post('/sum')
            .send({ a: 10000000000, b: 10000000000 })
            .expect(422)
            .then(response => {
            (0, vitest_1.expect)(response.body.message).toEqual("Inputs are too big");
        });
    });
});
(0, vitest_1.describe)("multiply endpoint", () => {
    (0, vitest_1.it)("testing multiply function using two positive number", () => {
        return (0, supertest_1.default)(__1.app)
            .post('/multiply')
            .send({ a: 20, b: 30 })
            .expect(200)
            .then(response => {
            (0, vitest_1.expect)(response.body.result).toBe(600);
        });
    });
    (0, vitest_1.it)("testing multiply function by multiplying using 0", () => {
        return (0, supertest_1.default)(__1.app)
            .post('/multiply')
            .send({ a: 0, b: 30 })
            .expect(200)
            .then(response => {
            (0, vitest_1.expect)(response.body.result).toBe(0);
        });
    });
    (0, vitest_1.it)("testing with high input values", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(__1.app).post('/multiply').send({ a: 100000000, b: 0 });
        (0, vitest_1.expect)(res.statusCode).toBe(422);
        (0, vitest_1.expect)(res.body.message).toBe("Inputs are too big");
    }));
});
