export default class User {
  constructor(id, name, password, timeSpent, admin) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.timeSpent = timeSpent;
    this.admin = admin;
  }

  static fromObject(obj) {
    return new User(obj.id, obj.name, obj.password, obj.timeSpent, obj.admin);
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      password: this.password,
      timeSpent: this.timeSpent,
      admin: this.admin,
    };
  }
}
