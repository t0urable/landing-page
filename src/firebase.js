// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7Dahq2zfjzLSwYrVSkCHRXFPLqaPCGOM",
  authDomain: "musicproj-8b7e2.firebaseapp.com",
  databaseURL: "https://musicproj-8b7e2-default-rtdb.firebaseio.com",
  projectId: "musicproj-8b7e2",
  storageBucket: "musicproj-8b7e2.appspot.com",
  messagingSenderId: "954560007864",
  appId: "1:954560007864:web:244542bf881416474a2e4d",
  measurementId: "G-W5SL6HWDWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics only in environments where `window` is defined (i.e., in the browser)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
