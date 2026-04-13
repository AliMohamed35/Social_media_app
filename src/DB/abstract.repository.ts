import {
  Model,
  MongooseUpdateQueryOptions,
  ProjectionType,
  QueryFilter,
  QueryOptions,
} from "mongoose";

export abstract class AbstractRepository<T> {
  constructor(protected model: Model<T>) {}

  async create(item: Partial<T>) {
    const doc = new this.model(item);
    return await doc.save();
  }

  async exist(
    filter: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return await this.model.findOne(filter, projection, options);
  }

  async getOne(
    filter: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ) {
    return await this.model.findOne(filter, projection, options);
  }

  async update(
    filter: QueryFilter<T>,
    update: Partial<T>,
    options: MongooseUpdateQueryOptions<T>,
  ) {
    await this.model.updateOne(filter, update);
  }

  async delete(filter: QueryFilter<T>) {
    await this.model.deleteOne(filter);
  }
}
