// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyD4GX2GTLRRCOorrGqcO-pGH-qLz3foTV4",
  authDomain: "careerwebservice.firebaseapp.com",
  projectId: "careerwebservice",
  storageBucket: "careerwebservice.appspot.com",
  messagingSenderId: "545926844574",
  appId: "1:545926844574:web:66b5876a6d56647a33ab8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export {storage};