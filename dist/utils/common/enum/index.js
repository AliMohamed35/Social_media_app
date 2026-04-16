"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseStatus = exports.USER_AGENT = exports.GENDER = exports.SYS_ROLE = void 0;
var SYS_ROLE;
(function (SYS_ROLE) {
    SYS_ROLE["user"] = "user";
    SYS_ROLE["admin"] = "admin";
    SYS_ROLE["superAdmin"] = "superAdmin";
})(SYS_ROLE || (exports.SYS_ROLE = SYS_ROLE = {}));
var GENDER;
(function (GENDER) {
    GENDER["male"] = "male";
    GENDER["female"] = "female";
})(GENDER || (exports.GENDER = GENDER = {}));
var USER_AGENT;
(function (USER_AGENT) {
    USER_AGENT["local"] = "local";
    USER_AGENT["google"] = "google";
})(USER_AGENT || (exports.USER_AGENT = USER_AGENT = {}));
var ApiResponseStatus;
(function (ApiResponseStatus) {
    ApiResponseStatus["Success"] = "Success";
    ApiResponseStatus["Failure"] = "Failure";
    ApiResponseStatus["BadRequest"] = "Bad Request";
    ApiResponseStatus["Unauthorized"] = "Unauthorized";
    ApiResponseStatus["NotFound"] = "Not Found";
    ApiResponseStatus["Conflict"] = "Conflict";
})(ApiResponseStatus || (exports.ApiResponseStatus = ApiResponseStatus = {}));
