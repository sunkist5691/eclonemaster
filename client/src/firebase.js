import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// auth helps users to authenticate through firebase
export const auth = firebase.auth();

// googleAuthProvider helps users to login through Google
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
