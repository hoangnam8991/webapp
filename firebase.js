import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQR7Hj1Bqfyd8Oc7_F7rQZvrgDg5-zRhY",
  authDomain: "webapp-3fd40.firebaseapp.com",
  projectId: "webapp-3fd40",
  storageBucket: "webapp-3fd40.firebasestorage.app",
  messagingSenderId: "397608170014",
  appId: "1:397608170014:web:a3aea29d4d8d18f70b340f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };