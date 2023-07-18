import firebase from "firebase/compat/app";

export default class firebaseUserProvider {
  constructor() {
    this.db = firebase.firestore();
  }

  async getUserById(id) {
    console.log(`[FIREBASE]: getting user by id: ${id}`);
    const snapshot = await this.db.collection("users").doc(id).get();

    if (snapshot.exists) return snapshot.data();
    return null;
  }

  async updateUser(user) {
    console.log(`[FIREBASE]: updating user by id: ${user.id}`);

    await this.db.collection("users").doc(user.id).update(user);
  }

  async getAllNonAdminUsers() {
    const snapshot = await this.db
      .collection("users")
      .where("admin", "==", "false")
      .get();

    if (snapshot.empty) return [];
    return snapshot.docs.map((snapshot) => snapshot.data());
  }
}
