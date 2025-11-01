// public/app.js (module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// ---- REPLACE THIS CONFIG with YOUR firebaseConfig from console ----
const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME",
  projectId: "REPLACE_ME",
  storageBucket: "REPLACE_ME",
  messagingSenderId: "REPLACE_ME",
  appId: "REPLACE_ME"
};
// -------------------------------------------------------------------

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// UI elements
const emailEl = document.getElementById('email');
const passEl = document.getElementById('password');
const signupBtn = document.getElementById('signup');
const signinBtn = document.getElementById('signin');
const signoutBtn = document.getElementById('signout');
const authMsg = document.getElementById('auth-msg');
const appArea = document.getElementById('app-area');
const authArea = document.getElementById('auth-area');
const userEmailSpan = document.getElementById('user-email');

signupBtn.addEventListener('click', async () => {
  const email = emailEl.value.trim();
  const pass = passEl.value;
  if (!email || !pass) { authMsg.textContent = 'Enter email and password'; return; }
  try {
    await createUserWithEmailAndPassword(auth, email, pass);
    authMsg.textContent = 'Account created & signed in';
  } catch (e) { authMsg.textContent = 'Error: ' + e.message; }
});

signinBtn.addEventListener('click', async () => {
  const email = emailEl.value.trim();
  const pass = passEl.value;
  if (!email || !pass) { authMsg.textContent = 'Enter email and password'; return; }
  try {
    await signInWithEmailAndPassword(auth, email, pass);
    authMsg.textContent = 'Signed in';
  } catch (e) { authMsg.textContent = 'Error: ' + e.message; }
});

signoutBtn.addEventListener('click', async () => {
  await signOut(auth);
});

onAuthStateChanged(auth, user => {
  if (user) {
    userEmailSpan.textContent = user.email;
    appArea.style.display = 'block';
    authArea.style.display = 'none';
    signoutBtn.style.display = 'inline-block';
  } else {
    appArea.style.display = 'none';
    authArea.style.display = 'block';
    signoutBtn.style.display = 'none';
    userEmailSpan.textContent = '';
  }
});
