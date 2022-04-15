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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dashboard_1 = __importDefault(require("../../service/dashboard"));
var database_1 = __importDefault(require("../../database"));
var productModel_1 = require("../../models/productModel");
var orderModel_1 = require("../../models/orderModel");
var userModel_1 = require("../../models/userModel");
var prod1 = {
    name: 'book',
    description: 'book',
    price: 5.0,
    unit: 'PCS',
    category: 'book'
};
var prod2 = { name: 'pen', description: 'pen', price: 5.0, unit: 'PCS', category: 'pen' };
var prod3 = {
    name: 'calculator',
    description: 'calculator',
    price: 5.0,
    unit: 'PCS',
    category: 'calculator'
};
var prod4 = {
    name: 'envelop',
    description: 'envelop',
    price: 5.0,
    unit: 'PCS',
    category: 'envelop'
};
var prod5 = {
    name: 'eraser',
    description: 'eraser',
    price: 5.0,
    unit: 'PCS',
    category: 'eraser'
};
var prod6 = {
    name: 'binder',
    description: 'binder',
    price: 5.0,
    unit: 'PCS',
    category: 'envelop'
};
var userone = {
    username: 'userone',
    password: 'userone',
    firstname: 'user',
    lastname: 'one'
};
var order1 = { username: userone.username, status: 'active' };
var order2 = { username: userone.username, status: 'active' };
var dashboardService = new dashboard_1.default();
var Product = new productModel_1.productModel();
var Order = new orderModel_1.orderModel();
var User = new userModel_1.userModel();
describe('Test Dashboard Service', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var dbCon, user1, book, pen, calculator, envelop, eraser, binder, orderone, ordertow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    dbCon = _a.sent();
                    return [4 /*yield*/, User.create(userone)];
                case 2:
                    user1 = _a.sent();
                    return [4 /*yield*/, Product.create(prod1)];
                case 3:
                    book = _a.sent();
                    return [4 /*yield*/, Product.create(prod2)];
                case 4:
                    pen = _a.sent();
                    return [4 /*yield*/, Product.create(prod3)];
                case 5:
                    calculator = _a.sent();
                    return [4 /*yield*/, Product.create(prod4)];
                case 6:
                    envelop = _a.sent();
                    return [4 /*yield*/, Product.create(prod5)];
                case 7:
                    eraser = _a.sent();
                    return [4 /*yield*/, Product.create(prod6)];
                case 8:
                    binder = _a.sent();
                    return [4 /*yield*/, Order.create(order1.username)];
                case 9:
                    orderone = _a.sent();
                    return [4 /*yield*/, Order.create(order2.username)];
                case 10:
                    ordertow = _a.sent();
                    return [4 /*yield*/, Order.addProduct(book.id, orderone.id, 2)];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, Order.addProduct(pen.id, orderone.id, 2)];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, Order.addProduct(calculator.id, orderone.id, 2)];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, Order.addProduct(book.id, ordertow.id, 3)];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, Order.addProduct(binder.id, ordertow.id, 3)];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, Order.addProduct(envelop.id, ordertow.id, 3)];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, Order.addProduct(eraser.id, ordertow.id, 3)];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, Order.update(orderone)];
                case 18:
                    _a.sent();
                    dbCon.release();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var dbCon;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    dbCon = _a.sent();
                    return [4 /*yield*/, dbCon.query('truncate table users cascade')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, dbCon.query('truncate table product cascade')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, dbCon.query('truncate table orders cascade')];
                case 4:
                    _a.sent();
                    dbCon.release();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should have product index by category method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(dashboardService.productByCategory).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('test product by category method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dashboardService.productByCategory('envelop')];
                case 1:
                    products = _a.sent();
                    expect(products === null || products === void 0 ? void 0 : products.length).toBe(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should have top 5 products method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(dashboardService.top5).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('Test top 5 products method', function () { return __awaiter(void 0, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dashboardService.top5()];
                case 1:
                    products = _a.sent();
                    expect(products === null || products === void 0 ? void 0 : products.length).toBe(5);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should have method for getting current user's completed orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(dashboardService.CompOrders).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it("Test method for getting current user's completed orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dashboardService.CompOrders(order1.username)];
                case 1:
                    order = _a.sent();
                    expect(order === null || order === void 0 ? void 0 : order.length).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should have method for getting current user's still active(open) orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(dashboardService.ActiveOrders).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it("Test method for getting current user's active orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dashboardService.ActiveOrders(order1.username)];
                case 1:
                    order = _a.sent();
                    expect(order === null || order === void 0 ? void 0 : order.length).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
});
