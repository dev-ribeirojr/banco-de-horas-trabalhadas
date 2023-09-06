import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDsGczfdnu5_RfpW-8R54EVfNnx-TVbQaA",
  authDomain: "banco-de-horas-7c354.firebaseapp.com",
  projectId: "banco-de-horas-7c354",
  storageBucket: "banco-de-horas-7c354.appspot.com",
  messagingSenderId: "133216406124",
  appId: "1:133216406124:web:d799d5835d8f2d59cbe649",
  measurementId: "G-MQBK42NCQP",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { db, auth };
