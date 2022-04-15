"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userHandler_1 = __importDefault(require("../../handlers/userHandler"));
var express_1 = require("express");
var routes = (0, express_1.Router)();
routes.get('/', userHandler_1.default.index);
routes.get('/:username', userHandler_1.default.show);
routes.post('/', userHandler_1.default.create);
//routes.put('/', verifyAuthToken, userHandler.update)
//routes.delete('/', verifyAuthToken, userHandler.del)
routes.post('/login', userHandler_1.default.login);
exports.default = routes;
