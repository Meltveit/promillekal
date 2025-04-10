// analytics.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlpGvtNGJOw8xqlfdxhRltQrCZ85Onkpo",
  authDomain: "promille-cal.firebaseapp.com",
  projectId: "promille-cal",
  storageBucket: "promille-cal.firebasestorage.app",
  messagingSenderId: "160163034820",
  appId: "1:160163034820:web:2de95072595432497e3b91",
  measurementId: "G-0PK7RVRLZQ"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Logg en sidevisning-hendelse
logEvent(analytics, 'page_view');

console.log("Firebase og Analytics initialisert!");
