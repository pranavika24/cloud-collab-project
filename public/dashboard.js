import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { 
  getFirestore, collection, addDoc, query, orderBy, serverTimestamp, 
  doc, deleteDoc, updateDoc, onSnapshot 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoSt5GFZSOdyFxtEkDkeISqmPEhqjNVZM",
  authDomain: "cloudcollabproject.firebaseapp.com",
  projectId: "cloudcollabproject",
  storageBucket: "cloudcollabproject.firebasestorage.app",
  messagingSenderId: "1006881810271",
  appId: "1:1006881810271:web:6e167d95219d66ab7178ea"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("userInfo").textContent = `Logged in as: ${user.email}`;
    listenToUserNotes(user.uid);
    listenToSharedNotes();
  } else {
    window.location.href = "index.html";
  }
});

// -------- PERSONAL NOTES --------
document.getElementById("saveBtn").addEventListener("click", async () => {
  const user = auth.currentUser;
  const text = document.getElementById("noteInput").value.trim();

  if (text && user) {
    await addDoc(collection(db, "users", user.uid, "notes"), {
      text,
      timestamp: serverTimestamp()
    });
    document.getElementById("noteInput").value = "";
  }
});

function listenToUserNotes(uid) {
  const q = query(collection(db, "users", uid, "notes"), orderBy("timestamp", "desc"));
  const notesDiv = document.getElementById("notes");

  onSnapshot(q, (snapshot) => {
    notesDiv.innerHTML = "";
    snapshot.forEach((docSnap) => renderNote(notesDiv, docSnap, uid, false));
  });
}

// -------- SHARED NOTES --------
document.getElementById("sharedSaveBtn").addEventListener("click", async () => {
  const user = auth.currentUser;
  const text = document.getElementById("sharedInput").value.trim();

  if (text && user) {
    await addDoc(collection(db, "sharedNotes"), {
      text,
      createdBy: user.email,
      timestamp: serverTimestamp()
    });
    document.getElementById("sharedInput").value = "";
  }
});

function listenToSharedNotes() {
  const q = query(collection(db, "sharedNotes"), orderBy("timestamp", "desc"));
  const sharedDiv = document.getElementById("sharedNotes");

  onSnapshot(q, (snapshot) => {
    sharedDiv.innerHTML = "";
    snapshot.forEach((docSnap) => renderNote(sharedDiv, docSnap, null, true));
  });
}

// -------- COMMON RENDER FUNCTION --------
function renderNote(container, docSnap, uid, isShared) {
  const data = docSnap.data();
  const noteDiv = document.createElement("div");
  noteDiv.className = "note-box";
  noteDiv.innerHTML = `
    <p contenteditable="false" class="note-text">${data.text}</p>
    ${isShared ? `<small>👤 ${data.createdBy || 'Anonymous'}</small>` : ""}
    <div class="note-actions">
      <button class="editBtn">✏️ Edit</button>
      <button class="deleteBtn">🗑️ Delete</button>
    </div>
  `;

  // Edit
  noteDiv.querySelector(".editBtn").addEventListener("click", async () => {
    const p = noteDiv.querySelector(".note-text");
    const editing = p.isContentEditable;
    if (editing) {
      const path = isShared ? ["sharedNotes", docSnap.id] : ["users", uid, "notes", docSnap.id];
      await updateDoc(doc(db, ...path), {
        text: p.textContent,
        timestamp: serverTimestamp()
      });
      p.contentEditable = false;
      p.style.background = "#e8f0fe";
    } else {
      p.contentEditable = true;
      p.focus();
      p.style.background = "#fff3cd";
    }
  });

  // Delete
  noteDiv.querySelector(".deleteBtn").addEventListener("click", async () => {
    const path = isShared ? ["sharedNotes", docSnap.id] : ["users", uid, "notes", docSnap.id];
    await deleteDoc(doc(db, ...path));
  });

  container.appendChild(noteDiv);
}

// -------- LOGOUT --------
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "index.html";
});