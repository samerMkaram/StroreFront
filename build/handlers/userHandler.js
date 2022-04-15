"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var userModel_1 = require("../models/userModel");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authorization_1 = __importDefault(require("../middleware/authorization"));
var User = new userModel_1.userModel();
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, uName, err_1, users, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                username = req.body.username;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.show((0, authorization_1.default)(req, username))];
            case 2:
                uName = _a.sent();
                if (!uName) {
                    return [2 /*return*/, res.status(401).json('Invalid user id ' + username)];
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(401).json(err_1.message)];
            case 4: return [4 /*yield*/, User.index()];
            case 5:
                users = _a.sent();
                return [2 /*return*/, res.status(200).json(users)];
            case 6:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(401).json(err_2.message)];
            case 7: return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstname, lastname, username, password, users, token, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname, username = _a.username, password = _a.password;
                if (!firstname || !lastname || !username || !password) {
                    return [2 /*return*/, res.status(400).json("Missing one or more user's info")];
                }
                return [4 /*yield*/, User.create(req.body)];
            case 1:
                users = _b.sent();
                token = jsonwebtoken_1.default.sign({ users: users }, process.env.JWT_SECRET);
                return [2 /*return*/, res.status(200).json(__assign(__assign({}, users), { token: token }))];
            case 2:
                err_3 = _b.sent();
                return [2 /*return*/, res.status(400).json(err_3.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, users, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                username = req.params.username;
                //const { username } = req.body
                if (!(0, authorization_1.default)(req, username)) {
                    return [2 /*return*/, res.status(400).json('Invalid user id ' + username)];
                }
                return [4 /*yield*/, User.show(username)];
            case 1:
                users = _a.sent();
                if (users) {
                    return [2 /*return*/, res.status(200).json(users)];
                }
                else {
                    return [2 /*return*/, res.status(400).json('no user found with id ' + username)];
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_4.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, users, token, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, username = _a.username, password = _a.password;
                if (!username || !password) {
                    return [2 /*return*/, res.status(400).json('Missing one or more login info')];
                }
                return [4 /*yield*/, User.authenticate(username, password)];
            case 1:
                users = _b.sent();
                if (users) {
                    token = jsonwebtoken_1.default.sign({ users: users }, process.env.JWT_SECRET);
                    return [2 /*return*/, res.status(200).json(__assign(__assign({}, users), { token: token }))];
                }
                else {
                    return [2 /*return*/, res.status(401).json({
                            status: 'FAIL',
                            message: 'user Login fail'
                        })];
                }
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                return [2 /*return*/, res.status(400).json(err_5.message)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = { index: index, create: create, show: show, login: login };
