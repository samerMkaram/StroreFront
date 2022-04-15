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
var productModel_1 = require("../models/productModel");
var authorization_1 = __importDefault(require("../middleware/authorization"));
var userModel_1 = require("../models/userModel");
var Product = new productModel_1.productModel();
var User = new userModel_1.userModel();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Product.index()];
            case 1:
                products = _a.sent();
                return [2 /*return*/, res.status(200).json(products)];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_1.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, description, price, unit, category, product, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, description = _a.description, price = _a.price, unit = _a.unit, category = _a.category;
                if (!name_1 || !price || !description || !category || !unit) {
                    return [2 /*return*/, res.status(400).json("Missing one or more product's info")];
                }
                try {
                    (0, authorization_1.default)(req, null);
                }
                catch (err) {
                    return [2 /*return*/, res.status(401).json(err.message)];
                }
                return [4 /*yield*/, Product.create(req.body)];
            case 1:
                product = _b.sent();
                return [2 /*return*/, res.status(200).json(product)];
            case 2:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(400).json(err_2.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                if (!id) {
                    return [2 /*return*/, res.status(400).json('Invalid product id ' + id)];
                }
                return [4 /*yield*/, Product.show(id)];
            case 1:
                product = _a.sent();
                if (product) {
                    return [2 /*return*/, res.status(200).json(product)];
                }
                else {
                    return [2 /*return*/, res.status(400).json('no product found with id ' + id)];
                }
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_3.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, name_2, description, price, unit, category, product, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, id = _a.id, name_2 = _a.name, description = _a.description, price = _a.price, unit = _a.unit, category = _a.category;
                if (!id || isNaN(id) || !name_2 || !description || !price || !category) {
                    return [2 /*return*/, res.status(400).json("Missing one or more product's info")];
                }
                try {
                    (0, authorization_1.default)(req, null);
                }
                catch (err) {
                    return [2 /*return*/, res.status(401).json(err.message)];
                }
                return [4 /*yield*/, Product.update(req.body)];
            case 1:
                product = _b.sent();
                if (product) {
                    return [2 /*return*/, res.status(200).json(product)];
                }
                else {
                    return [2 /*return*/, res.status(400).json('no product found with id ' + id)];
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                return [2 /*return*/, res.status(400).json(err_4.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var del = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.body.id;
                if (!id || typeof id !== 'number') {
                    return [2 /*return*/, res.status(400).json('Invalid product id ' + id)];
                }
                try {
                    (0, authorization_1.default)(req, null);
                }
                catch (err) {
                    return [2 /*return*/, res.status(401).json(err.message)];
                }
                return [4 /*yield*/, Product.delete(id)];
            case 1:
                product = _a.sent();
                if (product) {
                    return [2 /*return*/, res.status(200).json(product)];
                }
                else {
                    return [2 /*return*/, res.status(400).json('no product found with id ' + id)];
                }
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_5.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = { index: index, create: create, show: show, update: update, del: del };
