"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
var validateEnv_1 = __importDefault(require("@/utils/validateEnv"));
var app_1 = __importDefault(require("./app"));
var post_controller_1 = __importDefault(require("@/resources/post/post.controller"));
var user_controller_1 = __importDefault(require("@/resources/user/user.controller"));
(0, validateEnv_1.default)();
var app = new app_1.default([new post_controller_1.default(), new user_controller_1.default()], Number(process.env.PORT));
app.listen();
