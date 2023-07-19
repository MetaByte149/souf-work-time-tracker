export default class User {
  constructor(
    id,
    name,
    password,
    timeSpent,
    relaxTimeSpent,
    trainingTimeSpent,
    admin
  ) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.timeSpent = timeSpent;
    this.relaxTimeSpent = relaxTimeSpent;
    this.trainingTimeSpent = trainingTimeSpent;
    this.admin = admin;
  }

  static fromObject(obj) {
    return new User(
      obj.id || "ERR",
      obj.name || "ERR",
      obj.password || "ERR",
      obj.timeSpent || 0,
      obj.relaxTimeSpent || 0,
      obj.trainingTimeSpent || 0,
      obj.admin
    );
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      password: this.password,
      timeSpent: this.timeSpent,
      relaxTimeSpent: this.relaxTimeSpent,
      trainingTimeSpent: this.trainingTimeSpent,
      admin: this.admin,
    };
  }
}
