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
var orderModel_1 = require("../../models/orderModel");
var userModel_1 = require("../../models/userModel");
var productModel_1 = require("../../models/productModel");
var database_1 = __importDefault(require("../../database"));
var Order = new orderModel_1.orderModel();
var User = new userModel_1.userModel();
var Product = new productModel_1.productModel();
var testUser = {
    id: 1,
    firstname: 'test',
    lastname: 'test',
    username: 'test',
    password: 'test'
};
var testOrder = { id: 1, username: testUser.username, status: 'active' };
var testProduct = {
    id: 1,
    name: 'test',
    description: 'test',
    price: 5.0,
    unit: 'PCS',
    category: 'test'
};
describe('Test Order Model', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var newUser, newProduct, newOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User.create(testUser)];
                case 1:
                    newUser = _a.sent();
                    testUser.id = newUser.id;
                    return [4 /*yield*/, Product.create(testProduct)];
                case 2:
                    newProduct = _a.sent();
                    testProduct.id = newProduct.id;
                    return [4 /*yield*/, Order.create(testUser.username)];
                case 3:
                    newOrder = _a.sent();
                    testOrder.id = newOrder.id;
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var dbCon, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, database_1.default.connect()];
                case 1:
                    dbCon = _a.sent();
                    return [4 /*yield*/, dbCon.query('DELETE FROM order_prod cascade;')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, dbCon.query('alter sequence order_prod_id_seq RESTART WITH 1;')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, dbCon.query('DELETE FROM orders cascade;')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, dbCon.query('alter sequence orders_id_seq RESTART WITH 1;')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, dbCon.query('DELETE FROM product cascade;')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, dbCon.query('alter sequence product_id_seq RESTART WITH 1;')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, dbCon.query('DELETE FROM users cascade;')];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, dbCon.query('alter sequence users_id_seq RESTART WITH 1;')];
                case 9:
                    _a.sent();
                    dbCon.release();
                    return [3 /*break*/, 11];
                case 10:
                    err_1 = _a.sent();
                    console.log('Error :: ' + err_1);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    }); });
    //test create method
    it('Should have create order method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(Order.create).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('Should create order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Order.create(testUser.username)];
                case 1:
                    order = _a.sent();
                    expect(order.username).toBe(testOrder.username);
                    expect(order.status).toBe(testOrder.status);
                    return [2 /*return*/];
            }
        });
    }); });
    //test index method
    it('Should have index order method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(Order.index).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('Test index order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Order.index(testUser.username)];
                case 1:
                    orders = _a.sent();
                    expect(orders.length).toEqual(2);
                    return [2 /*return*/];
            }
        });
    }); });
    //test get order status method
    it('Should have get order status method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(Order.GetOrderstatus).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('Test get order status', function () { return __awaiter(void 0, void 0, void 0, function () {
        var status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Order.GetOrderstatus(testOrder.id)];
                case 1:
                    status = _a.sent();
                    expect(status).toBe(testOrder.status);
                    return [2 /*return*/];
            }
        });
    }); });
    //test add product to order method
    it('Should have addProduct to order method ', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(Order.addProduct).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('Should add product to order product list if status is active', function () { return __awaiter(void 0, void 0, void 0, function () {
        var addedprod;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Order.addProduct(testProduct.id, testOrder.id, 1)];
                case 1:
                    addedprod = _a.sent();
                    expect(addedprod === null || addedprod === void 0 ? void 0 : addedprod.product_id).toBe(testProduct.id);
                    return [2 /*return*/];
            }
        });
    }); });
    //test update method
    it('Should have update order method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(Order.update).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('Should update order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updatedOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Order.update(testOrder)];
                case 1:
                    updatedOrder = _a.sent();
                    expect(updatedOrder.status).toBe('complete');
                    return [2 /*return*/];
            }
        });
    }); });
    //tets show method
    it('Should have show order method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(Order.show).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('Should show order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Order.show(testUser.username, testOrder.id)];
                case 1:
                    order = _a.sent();
                    expect(order).not.toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
    //test delete method
    it('Should have delete order method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(Order.delete).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('Should delete order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var newOrder, deletedOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Order.create(testOrder.username)];
                case 1:
                    newOrder = _a.sent();
                    return [4 /*yield*/, Order.delete(newOrder.id, testUser.username)];
                case 2:
                    deletedOrder = _a.sent();
                    expect(deletedOrder).toEqual(newOrder);
                    return [2 /*return*/];
            }
        });
    }); });
});
