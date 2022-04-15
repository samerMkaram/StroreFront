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
var productModel_1 = require("../../models/productModel");
var database_1 = __importDefault(require("../../database"));
var testProduct = {
    name: 'product',
    description: 'product description',
    price: 5.0,
    unit: 'PCS',
    category: 'category'
};
var Product = new productModel_1.productModel();
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var newProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product.create(testProduct)];
            case 1:
                newProduct = _a.sent();
                testProduct.id = newProduct.id;
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
                return [4 /*yield*/, dbCon.query('DELETE FROM product')];
            case 2:
                _a.sent();
                return [4 /*yield*/, dbCon.query('alter sequence product_id_seq RESTART WITH 1')];
            case 3:
                _a.sent();
                return [4 /*yield*/, dbCon.release()];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('Test Product Model', function () {
    //test create method
    it('Should have create product method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(Product.create).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('test Create with a product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdProduct, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createdProduct = {
                        name: 'product',
                        description: 'product description',
                        price: 5.0,
                        unit: 'PCS',
                        category: 'category'
                    };
                    return [4 /*yield*/, Product.create(createdProduct)];
                case 1:
                    product = _a.sent();
                    expect(product.category).toBe(testProduct.category);
                    expect(product.description).toBe(testProduct.description);
                    expect(product.name).toBe(testProduct.name);
                    expect(product.unit).toBe(testProduct.unit);
                    return [2 /*return*/];
            }
        });
    }); });
    //test index method
    it('Should have index product method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(Product.index).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('Test index with a product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Product.index()];
                case 1:
                    products = _a.sent();
                    expect(products.length).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    //test show method
    it('Should have show product method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(Product.show).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('test show with a product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Product.show(testProduct.id)];
                case 1:
                    product = _a.sent();
                    expect(product.category).toEqual(testProduct.category);
                    expect(product.description).toEqual(testProduct.description);
                    expect(product.name).toEqual(testProduct.name);
                    expect(product.unit).toEqual(testProduct.unit);
                    expect(parseFloat(product.price)).toEqual(testProduct.price);
                    return [2 /*return*/];
            }
        });
    }); });
    //test update method
    it('Should update a product', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(Product.update).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('Test update with a product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updatedProduct, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updatedProduct = {
                        name: 'uproduct',
                        description: 'uproduct description',
                        price: 10,
                        unit: 'PCS',
                        category: 'category',
                        id: testProduct.id
                    };
                    return [4 /*yield*/, Product.update(updatedProduct)];
                case 1:
                    product = _a.sent();
                    expect(product.category).toEqual(updatedProduct.category);
                    expect(product.description).toEqual(updatedProduct.description);
                    expect(product.name).toEqual(updatedProduct.name);
                    expect(product.unit).toEqual(updatedProduct.unit);
                    expect(parseFloat(product.price)).toEqual(updatedProduct.price);
                    return [2 /*return*/];
            }
        });
    }); });
});
