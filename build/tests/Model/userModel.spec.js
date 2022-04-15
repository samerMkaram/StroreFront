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
var userModel_1 = require("../../models/userModel");
var database_1 = __importDefault(require("../../database"));
var User = new userModel_1.userModel();
var testUser = {
    firstname: 'fname',
    lastname: 'lname',
    username: 'uname',
    password: 'psword'
};
describe('Test User Model', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User.create(testUser)];
                case 1:
                    newUser = _a.sent();
                    testUser.id = newUser.id;
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
                    return [4 /*yield*/, dbCon.query('truncate table users cascade;')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, dbCon.query('alter sequence users_id_seq RESTART WITH 1')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, dbCon.release()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //test create method
    it('Should have create user method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(User.create).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('Test Create with a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createUser, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createUser = {
                        firstname: 'userFirstName',
                        lastname: 'userLastName',
                        username: 'userName',
                        password: 'psword'
                    };
                    return [4 /*yield*/, User.create(createUser)];
                case 1:
                    user = _a.sent();
                    expect(user.firstname).toBe(createUser.firstname);
                    expect(user.lastname).toBe(createUser.lastname);
                    expect(user.username).toBe(createUser.username);
                    return [2 /*return*/];
            }
        });
    }); });
    //test index method
    it('Should have index method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(User.index).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('test index with a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User.index()];
                case 1:
                    users = _a.sent();
                    expect(users.length).toBe(2);
                    return [2 /*return*/];
            }
        });
    }); });
    //test show method
    it('Should have show user method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(User.show).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('test show with a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User.show(testUser.username)];
                case 1:
                    user = _a.sent();
                    expect(user.firstname).toBe(testUser.firstname);
                    expect(user.lastname).toBe(testUser.lastname);
                    expect(user.username).toBe(testUser.username);
                    return [2 /*return*/];
            }
        });
    }); });
    //test authentication method
    it('Should have authenticate method', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(User.authenticate).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    it('Test authenticate method with worng credentials', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User.authenticate('1', '2')];
                case 1:
                    user = _a.sent();
                    expect(user).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Test authenticate method with correct credentials', function () { return __awaiter(void 0, void 0, void 0, function () {
        var authenticatedUser, newUser, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authenticatedUser = {
                        firstname: 'userFName',
                        lastname: 'userLName',
                        username: 'userUName',
                        password: 'psword'
                    };
                    return [4 /*yield*/, User.create(authenticatedUser)];
                case 1:
                    newUser = _a.sent();
                    authenticatedUser.id = newUser.id;
                    return [4 /*yield*/, User.authenticate(authenticatedUser.username, authenticatedUser.password)];
                case 2:
                    user = _a.sent();
                    expect(user === null || user === void 0 ? void 0 : user.firstname).toBe(authenticatedUser.firstname);
                    expect(user === null || user === void 0 ? void 0 : user.lastname).toBe(authenticatedUser.lastname);
                    expect(user === null || user === void 0 ? void 0 : user.username).toBe(authenticatedUser.username);
                    return [2 /*return*/];
            }
        });
    }); });
});
