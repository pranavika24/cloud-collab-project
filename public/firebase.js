// Import the Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ✅ Your Firebase Configuration (update with your own)
const firebaseConfig = {
  apiKey: "AIzaSyDoSt5GFZSOdyFxtEkDkeISqmPEhqjNVZM",
  authDomain: "cloud-collab-project.firebaseapp.com",
  projectId: "cloud-collab-project",
  storageBucket: "cloudcollabproject.firebasestorage.app",
  messagingSenderId: "1006881810271",
  appId: "1:1006881810271:web:6e167d95219d66ab7178ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth for use in other scripts
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut };