import { firebaseApp } from "../config/firebase"

export async function isEmailExist (email) {
    const result = await firebaseApp.firestore()
                                   .collection('users')
                                   .where('email', '==', email)
                                   .get();
    return result.docs.map((user) => user.data().length > 0);
}