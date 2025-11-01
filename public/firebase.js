// Import the Firebase SDK you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { signUpBtn, auth } from "./script";
// If you want to use Firestore, Authentication, or Storage later,
// you can also import them like this:
// import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
// import { getStorage } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoSt5GFZSOdyFxtEkDkeISqmPEhqjNVZM",
  authDomain: "cloudcollabproject.firebaseapp.com",
  projectId: "cloudcollabproject",
  storageBucket: "cloudcollabproject.appspot.com",
  messagingSenderId: "1006881810271",
  appId: "1:1006881810271:web:6e167d95219d66ab7178ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export if you want to use in other JS files
export { app };

console.log("✅ Firebase connected successfully:", app.name);if (signUpBtn) {
    signUpBtn.addEventListener("click", () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("✅ User registered successfully!");
                console.log("User:", userCredential.user);
            })
            .catch((error) => {
                alert("⚠️ " + error.message);
            });
    });
}

