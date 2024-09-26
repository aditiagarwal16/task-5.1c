

// Import the required functions from Firebase SDK
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration (from your Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCquP0L2USmAKsEnqGPQQIGsFtoOMzGWiU",
  authDomain: "post-page-ef18d.firebaseapp.com",
  projectId: "post-page-ef18d",
  storageBucket: "post-page-ef18d.appspot.com",
  messagingSenderId: "546287741740",
  appId: "1:546287741740:web:5e26c1b80e35925e1b5a89",
  measurementId: "G-5XDNRS2NPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };
