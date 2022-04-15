"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
function verifyAuthToken(req, username) {
    if (username === void 0) { username = null; }
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
        var decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        if (username && decoded.users.username !== username) {
            throw new Error('User id does not match!');
        }
        return decoded.users.username;
    }
    catch (error) {
        throw new Error('Authorization failed!');
    }
}
exports.default = verifyAuthToken;
