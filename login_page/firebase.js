import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBC_QGtasFWeXqR6HWFExxHoG33VVj0nnA",
    authDomain: "bitolx-eb2f5.firebaseapp.com",
    projectId: "bitolx-eb2f5",
    storageBucket: "bitolx-eb2f5.appspot.com",
    messagingSenderId: "709510627062",
    appId: "1:709510627062:web:d6790183c7154a5bd8b6d7",
    measurementId: "G-HGQFGLTCTY",
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);  
const db = getFirestore(app);
function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
}

function validate_password(password) {
    return password.length >= 6;
}

document.getElementById("login-btn").addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!validate_email(email)) {
        document.getElementById("erroremail").innerHTML = "Invalid email format";
        return;
    }

    if (!validate_password(password)) {
        document.getElementById("errorpass").innerHTML = "Password must be at least 6 characters";
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user; 

        alert(user.email + " Logged In successfully!");

        const docRef = doc(db, "users", user.uid); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log("User Data:", userData);
        } else {
            console.log("No additional user data found in Firestore.");
        }

        window.location.replace("../user/user.html");

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
            document.getElementById("errorpass").innerHTML = "Incorrect password!";
        } else if (errorCode === "auth/user-not-found") {
            document.getElementById("erroremail").innerHTML = "User not found. Please check your email.";
        } else {
            alert("Error: " + errorMessage);
        }
    }
});