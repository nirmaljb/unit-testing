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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const inputValidator = (req, res, next) => {
    const { a, b } = req.body;
    if (a > 10000000 || b > 10000000) {
        return res.status(422).json({ message: 'Inputs are too big' });
    }
    next();
};
exports.app.use(inputValidator);
exports.app.post('/sum', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { a, b } = req.body;
    const sum = a + b;
    yield db_1.prismaClient.request.create({
        data: {
            a,
            b,
            answer: sum,
            type: "Sum"
        }
    });
    res.json({ response: sum });
}));
exports.app.post('/multiply', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { a, b } = req.body;
    const multiply = a * b;
    yield db_1.prismaClient.request.create({
        data: {
            a,
            b,
            answer: multiply,
            type: "Multiply"
        }
    });
    res.json({ result: multiply });
}));
