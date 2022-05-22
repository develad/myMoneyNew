import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhqYSvr7ufVoZMZyPNaJxM8-L6sSL2Cl8",
  authDomain: "mymoney-4a8eb.firebaseapp.com",
  projectId: "mymoney-4a8eb",
  storageBucket: "mymoney-4a8eb.appspot.com",
  messagingSenderId: "813142353066",
  appId: "1:813142353066:web:61bfe6f4f855290dcc9cd3",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.Timestamp;

//exporting firebase services in the appliction
export { projectFirestore, projectAuth, timestamp };
