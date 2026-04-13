import { QueryFilter } from "mongoose";
import { IUser } from "../../../utils/common/interface";
import { User } from "./user.model";
import { AbstractRepository } from "../../abstract.repository";

export class UserRepository extends AbstractRepository<IUser> {
  constructor() {
    super(User);
  }

  async getSpecificUser(filter: QueryFilter<IUser>) {
    return await this.getOne(filter);
  }
}
