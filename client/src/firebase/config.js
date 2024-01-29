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
  apiKey: "AIzaSyCMIiE6qumCdgZmKB7uRWcqrfA4f-jBYtY",
  authDomain: "capstone-2-6b8c3.firebaseapp.com",
  projectId: "capstone-2-6b8c3",
  storageBucket: "capstone-2-6b8c3.appspot.com",
  messagingSenderId: "218332379633",
  appId: "1:218332379633:web:a2a3542ca6b92a7ee42c50"
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
