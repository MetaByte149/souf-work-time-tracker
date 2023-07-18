import User from "../../models/user";

export default class UserRepo {
  constructor(provider) {
    this.provider = provider;
  }

  async getUserById(id) {
    const obj = await this.provider.getUserById(id);
    return User.fromObject(obj);
  }

  async updateUser(user) {
    const obj = user.toObject();

    return this.provider.updateUser(obj);
  }
}
