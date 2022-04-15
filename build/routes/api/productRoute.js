"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var productHandler_1 = __importDefault(require("../../handlers/productHandler"));
var express_1 = require("express");
var dashboard_1 = __importDefault(require("../../handlers/dashboard"));
var routes = (0, express_1.Router)();
routes.get('/top5', dashboard_1.default.topfive);
routes.post('/:category', dashboard_1.default.productByCategory);
routes.get('/', productHandler_1.default.index);
routes.get('/:id', productHandler_1.default.show);
routes.post('/', productHandler_1.default.create);
routes.put('/', productHandler_1.default.update);
routes.delete('/', productHandler_1.default.del);
exports.default = routes;
