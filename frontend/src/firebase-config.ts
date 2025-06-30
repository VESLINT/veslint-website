
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// TODO: Replace with your own Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwSZGG9FA3-djtnxlgPBmE6ZP7n9L2wIA",
  authDomain: "veslint-49fb2.firebaseapp.com",
  databaseURL: "https://veslint-49fb2-default-rtdb.firebaseio.com",
  projectId: "veslint-49fb2",
  storageBucket: "veslint-49fb2.firebasestorage.app",
  messagingSenderId: "942460719406",
  appId: "1:942460719406:web:b367b82b8625ffcc1beabf",
  measurementId: "G-4101TZN7PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Connect to emulators in development
console.log('Environment:', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  console.log('Connecting to Firebase emulators...');
  try {
    connectAuthEmulator(auth, "http://localhost:9099");
  } catch (error) {
    // Already connected
  }

  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
  } catch (error) {
    // Already connected
  }

  try {
    connectStorageEmulator(storage, 'localhost', 9199);
  } catch (error) {
    // Already connected
  }

  try {
    connectFunctionsEmulator(functions, 'localhost', 8082);
  } catch (error) {
    // Already connected or emulator not available
    console.log('Functions emulator connection failed:', error);
  }
}
