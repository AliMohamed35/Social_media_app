import { QueryFilter } from "mongoose";
import { IUser } from "../../../utils/common/interface";
import { AbstractRepository } from "../../Abstract.repository";
import { User } from "./user.model";

export class UserRepository extends AbstractRepository<IUser> {
  constructor() {
    super(User);
  }

  async getSpecificUser(filter: QueryFilter<IUser>) {
    return await this.getOne(filter);
  }
}
