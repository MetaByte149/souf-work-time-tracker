import firebase from "firebase/compat/app";
import User from "../../models/user";

export default class firebaseUserProvider {
  constructor() {
    this.firestore = firebase.firestore();
  }

  async getUserById(id) {
    console.log(`[FIREBASE]: getting user by id: ${id}`);
    const snapshot = await this.firestore.collection("users").doc(id).get();

    if (snapshot.exists) return snapshot.data();
    return null;
  }

  async updateUser(user) {
    console.log(`[FIREBASE]: updating user by id: ${user.id}`);

    await this.firestore.collection("users").doc(user.id).update(user);
  }

  async getAllNonAdminUsers() {
    const snapshot = await this.firestore
      .collection("users")
      .where("admin", "==", "false")
      .get();

    if (snapshot.empty) return [];
    return snapshot.docs.map((snapshot) => snapshot.data());
  }

  async createNewUser(id, name, password, admin) {
    console.log(admin)
    const newUser = new User(id, name, password, 0, admin);

    this.firestore.collection("users").doc(id).set(newUser.toObject());
  }
}
