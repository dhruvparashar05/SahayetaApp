import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCeTaXbS_VpgiHnqecJXfBAYeosU61BJcM",
  authDomain: "sahayetaapp.firebaseapp.com",
  projectId: "sahayetaapp",
  storageBucket: "sahayetaapp.firebasestorage.app",
  messagingSenderId: "17842573864",
  appId: "1:17842573864:web:f378817f0677229fdd5b1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Create an emergency alert in Firestore
export const createEmergencyAlert = async (alertData) => {
  try {
    const docRef = await addDoc(collection(db, 'alerts'), alertData);
    console.log("Alert sent to Firestore with ID: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
