"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var orderHandler_1 = __importDefault(require("../../handlers/orderHandler"));
var express_1 = require("express");
var dashboard_1 = __importDefault(require("../../handlers/dashboard"));
var routes = (0, express_1.Router)();
routes.get('/complete', dashboard_1.default.completeOrders);
routes.get('/active', dashboard_1.default.activeOrders);
routes.get('/:id', orderHandler_1.default.show);
routes.get('/', orderHandler_1.default.index);
routes.post('/', orderHandler_1.default.create);
routes.post('/:orderID/addproduct', orderHandler_1.default.addProduct);
routes.put('/', orderHandler_1.default.complete);
routes.delete('/:id', orderHandler_1.default.del);
exports.default = routes;
