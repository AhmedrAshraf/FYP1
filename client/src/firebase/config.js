import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

// const firebaseConfig = {
// 	apiKey: "AIzaSyAGsLSSNF4yDUcfaYKEs_SYMBefJHxSGns",
// 	authDomain: "sudofy-capstone.firebaseapp.com",
// 	projectId: "sudofy-capstone",
// 	storageBucket: "sudofy-capstone.appspot.com",
// 	messagingSenderId: "597636209914",
// 	appId: "1:597636209914:web:44503282ac0485eb45bd43",
// 	https: "//sudofy-capstone-default-rtdb.firebaseio.com/",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBUYoj5YhfLfd2BqcbWvnLDLxsU03vlqYU",
  authDomain: "capstone-fyp-new.firebaseapp.com",
  projectId: "capstone-fyp-new",
  storageBucket: "capstone-fyp-new.appspot.com",
  messagingSenderId: "674059067055",
  appId: "1:674059067055:web:5c41ba53d1a6d5b8edbe5a",
  https: "//capstone-fyp-new-default-rtdb.firebaseio.com/"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// // Initialize Cloud Storage and get a reference to the service
const storage = firebase.storage();
const storageRef = storage.ref();

// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// Initialize Realtime Database and get a reference to the service
const realtime = firebase.database();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, firebase, realtime, storageRef, storage, projectAuth, timestamp };
