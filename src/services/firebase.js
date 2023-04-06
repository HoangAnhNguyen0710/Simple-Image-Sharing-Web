import { firebaseApp } from "../config/firebase"

export async function isEmailExist (email) {
    const result = await firebaseApp.firestore()
                                   .collection('users')
                                   .where('email', '==', email)
                                   .get();
    return result.docs.map((user) => user.data().length > 0);
}

export async function getImagesList () {
    const images = await firebaseApp.firestore()
                                    .collection('images').orderBy("dateCreated")
                                    .limit(16).get();
    return images.docs.map((image) => image.data());
}