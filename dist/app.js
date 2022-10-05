"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var error_middleware_1 = __importDefault(require("@/middleware/error.middleware"));
var helmet_1 = __importDefault(require("helmet"));
var App = /** @class */ (function () {
    function App(controllers, port) {
        this.port = parseInt(process.env.PORT || '5000');
        this.express = (0, express_1.default)();
        this.port = this.port;
        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }
    App.prototype.initialiseMiddleware = function () {
        this.express.use((0, helmet_1.default)());
        this.express.use((0, cors_1.default)());
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, compression_1.default)());
    };
    App.prototype.initialiseControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.express.use('/api', controller.router);
        });
    };
    App.prototype.initialiseErrorHandling = function () {
        this.express.use(error_middleware_1.default);
    };
    App.prototype.initialiseDatabaseConnection = function () {
        mongoose_1.default.connect(process.env.DB_URI || '');
    };
    App.prototype.listen = function () {
        var _this = this;
        this.express.listen(this.port, function () {
            console.log("App listening on the port ".concat(_this.port));
        });
    };
    return App;
}());
exports.default = App;
