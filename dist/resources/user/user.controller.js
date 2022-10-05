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
var express_1 = require("express");
var http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
var validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
var user_validation_1 = __importDefault(require("@/resources/user/user.validation"));
var user_service_1 = __importDefault(require("@/resources/user/user.service"));
var authenticated_middleware_1 = __importDefault(require("@/middleware/authenticated.middleware"));
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.UserService = new user_service_1.default();
        this.register = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, name_1, email, password, token, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                        return [4 /*yield*/, this.UserService.register(name_1, email, password, 'user')];
                    case 1:
                        token = _b.sent();
                        res.status(201).json({ token: token });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        next(new http_exception_1.default(400, error_1.message));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.login = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, token, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, this.UserService.login(email, password)];
                    case 1:
                        token = _b.sent();
                        res.status(200).json({ token: token });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        next(new http_exception_1.default(400, error_2.message));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getUser = function (req, res, next) {
            if (!req.user) {
                return next(new http_exception_1.default(404, 'No logged in user'));
            }
            res.status(200).send({ data: req.user });
        };
        this.initialiseRoutes();
    }
    UserController.prototype.initialiseRoutes = function () {
        this.router.post("".concat(this.path, "/register"), (0, validation_middleware_1.default)(user_validation_1.default.register), this.register);
        this.router.post("".concat(this.path, "/login"), (0, validation_middleware_1.default)(user_validation_1.default.login), this.login);
        this.router.get("".concat(this.path), authenticated_middleware_1.default, this.getUser);
    };
    return UserController;
}());
exports.default = UserController;
