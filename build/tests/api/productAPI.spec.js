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
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var database_1 = __importDefault(require("../../database"));
var request = (0, supertest_1.default)(server_1.default);
var product = {
    name: 'KB',
    description: 'keyboard',
    price: 5.0,
    unit: 'PCS',
    category: 'IT'
};
var user = {
    id: 1,
    firstname: 'Leo',
    lastname: 'Messy',
    username: 'LeoMessy',
    password: '10'
};
var token;
var prodID;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request
                    .post('/api/users')
                    .send(user)
                    .expect(200)
                    .then(function (res) {
                    token = res.body.token;
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var dbCon;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, request];
            case 1:
                _a.sent();
                return [4 /*yield*/, database_1.default.connect()];
            case 2:
                dbCon = _a.sent();
                return [4 /*yield*/, dbCon.query('truncate table users cascade;')];
            case 3:
                _a.sent();
                return [4 /*yield*/, dbCon.query('alter sequence users_id_seq RESTART WITH 1')];
            case 4:
                _a.sent();
                return [4 /*yield*/, dbCon.release()];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('Test Product API', function () {
    it('Success create a product', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .post('/api/products')
                        .send(product)
                        .set('Authorization', "Bearer ".concat(token))
                        .expect(200)
                        .then(function (res) {
                        prodID = res.body.id;
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Success update a product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    product = {
                        name: 'Mouse',
                        description: 'Mouse',
                        price: 5.0,
                        unit: 'PCS',
                        category: 'IT',
                        id: prodID
                    };
                    return [4 /*yield*/, request
                            .put('/api/products')
                            .send(product)
                            .set('Authorization', 'Bearer ' + token)
                            .expect(200)
                            .then(function (res) {
                            expect(res.text).toContain('Mouse');
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Fail update a product with missing product ID', function () { return __awaiter(void 0, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    product = { name: 'Mouse', description: 'Mouse', price: 5.0, unit: 'PCS', category: 'IT' };
                    return [4 /*yield*/, request
                            .put('/api/products')
                            .send(product)
                            .set('Authorization', 'Bearer ' + token)
                            .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Failed show a non exist product', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/api/products/xyz')
                        .send()
                        .set('Authorization', 'Bearer ' + token)
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Success show a product with valid data', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/api/products/' + prodID)
                        .send()
                        .set('Authorization', 'Bearer ' + token)
                        .expect(200)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Success product index', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .get('/api/products')
                        .send()
                        .set('Authorization', 'Bearer ' + token)
                        .expect(200)
                        .then(function (res) {
                        expect(res.text).toContain('Mouse');
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Success delete a product with complete data', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete('/api/products')
                        .send({ id: prodID })
                        .set('Authorization', 'Bearer ' + token)
                        .expect(200)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Fail delete a product with incomplete data', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request
                        .delete('/api/products')
                        .send()
                        .set('Authorization', 'Bearer ' + token)
                        .expect(400)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
