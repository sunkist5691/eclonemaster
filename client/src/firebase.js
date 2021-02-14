import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDLA8uB6gluRv9vjT8jhIToP-D44wKshJI",
  authDomain: "ecommerce-af12b.firebaseapp.com",
  projectId: "ecommerce-af12b",
  storageBucket: "ecommerce-af12b.appspot.com",
  messagingSenderId: "650305414125",
  appId: "1:650305414125:web:bb5ced101ef42b3c45bde4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// auth helps users to authenticate through firebase
export const auth = firebase.auth();

// googleAuthProvider helps users to login through Google
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
