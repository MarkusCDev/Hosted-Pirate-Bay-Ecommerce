import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries




const firebaseConfig = {
  apiKey: "AIzaSyDLSBg9d4yJCPBXd9Qp1Oyzu3QfOCxTv5U",
  authDomain: "pbay-d.firebaseapp.com",
  projectId: "pbay-d",
  storageBucket: "pbay-d.appspot.com",
  messagingSenderId: "787898333903",
  appId: "1:787898333903:web:839b69b134b42ea2f355ba",
};



// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);