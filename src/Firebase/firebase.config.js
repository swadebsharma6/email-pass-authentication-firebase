
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIaoSK458YnNFs02W2a8BIH0p3t7qQvN4",
  authDomain: "user-email-pass-authenti-a8d82.firebaseapp.com",
  projectId: "user-email-pass-authenti-a8d82",
  storageBucket: "user-email-pass-authenti-a8d82.firebasestorage.app",
  messagingSenderId: "134636381537",
  appId: "1:134636381537:web:9063357cf4be4253219120"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;