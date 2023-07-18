import User from "../../models/user";

export default class UserRepo {
  constructor(provider) {
    this.provider = provider;
  }

  async getUserById(id) {
    const obj = await this.provider.getUserById(id);
    console.log(obj);
    return User.fromObject(obj);
  }

  async updateUser(user) {
    const obj = user.toObject();

    return this.provider.updateUser(obj);
  }

  async getAllNonAdminUsers() {
    const objs = await this.provider.getAllNonAdminUsers();

    return objs.map((obj) => User.fromObject(obj));
  }

  async createNewUser(id, name, password, admin) {
    return await this.provider.createNewUser(id, name, password, admin);
  }
}
