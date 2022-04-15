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
exports.orderModel = void 0;
var database_1 = __importDefault(require("../database"));
var orderModel = /** @class */ (function () {
    function orderModel() {
    }
    orderModel.prototype.index = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCon, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbCon = _a.sent();
                        sql = 'SELECT * FROM orders where username =($1)';
                        return [4 /*yield*/, dbCon.query(sql, [username])];
                    case 2:
                        result = _a.sent();
                        dbCon.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Could not get orders. Error: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.show = function (username, id) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCon, order, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.validOrderUser(username, id)];
                    case 1:
                        if (!(_a.sent())) {
                            throw new Error('invalid owner or deleted order');
                        }
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        dbCon = _a.sent();
                        return [4 /*yield*/, dbCon.query("  select jsonb_build_object(\n            'Order ID', c.id,\n             'User' , uu.username,\n             'Status' , c.status,\n            'order_details', orderP.products)\n            from orders c\n            left outer join lateral (\n            select jsonb_agg(jsonb_build_object('quantity', quantity, 'product_id', product_id  , 'product name',d.name , 'product price',d.price , 'order line cost',quantity*d.price)) as products,\n            order_id \n            from order_prod p  left outer join product d on (p.product_id = d.id )\n            where p.order_id = c.id\n            group by order_id\n            ) orderP on true\n            join users uu on (c.username=uu.username)\n            where c.id= ".concat(id))];
                    case 3:
                        order = _a.sent();
                        dbCon.release();
                        return [2 /*return*/, order.rows[0]];
                    case 4:
                        err_2 = _a.sent();
                        throw new Error("Could not get order. Error: ".concat(err_2));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.create = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCon, sql, order, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbCon = _a.sent();
                        sql = 'INSERT INTO orders (username, status) VALUES (($1),($2))  returning *';
                        return [4 /*yield*/, dbCon.query(sql, [username, 'active'])];
                    case 2:
                        order = _a.sent();
                        dbCon.release();
                        return [2 /*return*/, order.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not create order. Error: ".concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.GetOrderstatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCon, sql, status_1, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbCon = _a.sent();
                        sql = 'select status from orders where id = ($1)';
                        return [4 /*yield*/, dbCon.query(sql, [id])];
                    case 2:
                        status_1 = _a.sent();
                        dbCon.release();
                        return [2 /*return*/, status_1.rows[0].status];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Could not get order status . Error: ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.update = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCon, sql, order, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbCon = _a.sent();
                        sql = 'UPDATE orders SET status = ($1) WHERE id = ($2) and username = ($3)  returning *';
                        return [4 /*yield*/, dbCon.query(sql, ['complete', o.id, o.username])];
                    case 2:
                        order = _a.sent();
                        dbCon.release();
                        if (order.rows.length === 0) {
                            throw new Error('Order not found');
                        }
                        return [2 /*return*/, order.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Order not exist.");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.delete = function (id, username) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCon, sql, deletedorder, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.validOrderUser(username, id)];
                    case 1:
                        if (!(_a.sent())) {
                            throw new Error('you are not the owner of this order');
                        }
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        dbCon = _a.sent();
                        sql = 'DELETE FROM order_prod WHERE order_id = ($1)';
                        return [4 /*yield*/, dbCon.query(sql, [id])];
                    case 3:
                        _a.sent();
                        sql = 'DELETE FROM orders WHERE id = ($1) returning *';
                        return [4 /*yield*/, dbCon.query(sql, [id])];
                    case 4:
                        deletedorder = _a.sent();
                        dbCon.release();
                        return [2 /*return*/, deletedorder.rows[0]];
                    case 5:
                        err_6 = _a.sent();
                        throw new Error("Could not delete order. Error: ".concat(err_6));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.addProduct = function (prod_id, order_id, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCon, sql, order, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbCon = _a.sent();
                        sql = 'INSERT INTO order_prod (order_id, product_id, quantity)  VALUES ($1,$2,$3) returning *';
                        return [4 /*yield*/, dbCon.query(sql, [order_id, prod_id, quantity])];
                    case 2:
                        order = _a.sent();
                        dbCon.release();
                        return [2 /*return*/, order.rows[0]];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("Could not add product to order. Error: ".concat(err_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.validOrderUser = function (username, order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var dbCon, sql, order, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbCon = _a.sent();
                        sql = 'select * from orders where id = $1 and username = $2';
                        return [4 /*yield*/, dbCon.query(sql, [order_id, username])];
                    case 2:
                        order = _a.sent();
                        dbCon.release();
                        if (order.rows.length === 0) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_8 = _a.sent();
                        throw new Error("this user is not order owner: ".concat(err_8));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return orderModel;
}());
exports.orderModel = orderModel;
