import firebase from "firebase/compat";

let firebaseConfig = {
  apiKey: "AIzaSyALiTbZsVU1xIT_xVSqbnkdzpkip_KCVjU",
  authDomain: "loginauth-408a7.firebaseapp.com",
  projectId: "loginauth-408a7",
  storageBucket: "loginauth-408a7.appspot.com",
  messagingSenderId: "249390265391",
  appId: "1:249390265391:web:23e674eee1270e57e942da"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
export let firebaseAuth = firebaseApp.auth();
export let firebaseStorage = firebaseApp.storage();
export let firebaseDB = firebaseApp.firestore();
export let timeStamp = firebase.firestore.FieldValue.serverTimestamp;



