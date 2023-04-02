import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';

// import { seedDatabase } from '../seed';

const firebaseConfig = {
  apiKey: "AIzaSyAPc8M2OMFDJ5mNqLHv1jgdm8enZ1mR_nM",
  authDomain: "simpleimagesharingapp.firebaseapp.com",
  projectId: "simpleimagesharingapp",
  storageBucket: "simpleimagesharingapp.appspot.com",
  messagingSenderId: "1047083342670",
  appId: "1:1047083342670:web:9c1fef5b26d91d5f8f5c1f",
  measurementId: "G-3ZXKGGKG6T"
};

const firebaseApp = Firebase.initializeApp(firebaseConfig);
const { FieldValue } = Firebase.firestore;
// create firebase storage
const FirebaseStorage = Firebase.storage();
// seedDatabase(firebase);
const analytic = Firebase.analytics();
export { firebaseApp, FieldValue, FirebaseStorage, analytic };
