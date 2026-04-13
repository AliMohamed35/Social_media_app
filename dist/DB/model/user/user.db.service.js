"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const Abstract_repository_1 = require("../../Abstract.repository");
const user_model_1 = require("./user.model");
class UserRepository extends Abstract_repository_1.AbstractRepository {
    constructor() {
        super(user_model_1.User);
    }
    async getAllUsers() {
        return await this.model.find();
    }
}
exports.UserRepository = UserRepository;
