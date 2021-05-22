import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


// Firebase configuration details
var firebaseConfig = {
    apiKey: "AIzaSyAfvCYkQwfh2Kxb0GoE7yZv-rWHwbMwUKo",
    authDomain: "quiz-demo-1faa8.firebaseapp.com",
    databaseURL: "https://quiz-demo-1faa8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "quiz-demo-1faa8",
    storageBucket: "quiz-demo-1faa8.appspot.com",
    messagingSenderId: "821006953121",
    appId: "1:821006953121:web:f30aae9c108ca895681ee0"
};

// Initialize the Firebase db
var firebaseDb = firebase.initializeApp(firebaseConfig);

// Export a reference to the database
export default firebaseDb.database().ref();

// Initialize  and export the Firebase auth module
export const auth = firebaseDb.auth();