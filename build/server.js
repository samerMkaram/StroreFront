"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
var address = '0.0.0.0:3000';
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/api', function (req, res) {
    res.send('move to ');
});
app.use('/api', routes_1.default);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports.default = app;
