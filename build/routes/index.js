"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userRoute_1 = __importDefault(require("./api/userRoute"));
var productRoute_1 = __importDefault(require("./api/productRoute"));
var orderRoute_1 = __importDefault(require("./api/orderRoute"));
var routes = (0, express_1.default)();
routes.use('/users', userRoute_1.default);
routes.use('/products', productRoute_1.default);
routes.use('/orders', orderRoute_1.default);
exports.default = routes;
