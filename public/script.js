// Import the Firebase SDKs you need (using CDN imports)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// ✅ Your web app's Firebase configuration
// (replace this with your exact Firebase config from Project Settings)
const firebaseConfig = {
  apiKey: "AIzaSyDoSt5GFZSOdyFxtEkDkeISqmPEhqjNVZM",
  authDomain: "cloudcollabproject.firebaseapp.com",
  projectId: "cloudcollabproject",
  storageBucket: "cloudcollabproject.appspot.com", // ✅ FIXED HERE
  messagingSenderId: "1006881810271",
  appId: "1:1006881810271:web:6e167d95219d66ab7178ea"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Sign Up function
const signUpButton = document.getElementById("signup-btn");
signUpButton.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("✅ User registered successfully!");
      console.log("User:", userCredential.user);
    })
    .catch((error) => {
      alert("Error: " + error.message);
      console.error(error);
    });
});

// ✅ Sign In function
const signInButton = document.getElementById("signin-btn");
signInButton.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("✅ Signed in successfully!");
      console.log("User:", userCredential.user);
    })
    .catch((error) => {
      alert("Error: " + error.message);
      console.error(error);
    });
});
