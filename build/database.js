"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, POSTGRES_DATABASE = _a.POSTGRES_DATABASE, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_PORT = _a.POSTGRES_PORT, POSTGRES_DATABASE_TEST = _a.POSTGRES_DATABASE_TEST, ENV = _a.ENV;
var dbConnection = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: ENV === 'dev' ? POSTGRES_DATABASE : POSTGRES_DATABASE_TEST,
    password: POSTGRES_PASSWORD,
    user: POSTGRES_USER
});
dbConnection.on('error', function () {
    console.log('ERROR in DATABASE connection');
});
exports.default = dbConnection;
