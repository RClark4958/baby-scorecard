import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBb3Fc76U-ALWri6BGCipOxmH66RsgJi3w",
  authDomain: "baby-scorecard.firebaseapp.com",
  databaseURL: "https://baby-scorecard.firebaseio.com",
  projectId: "baby-scorecard",
  storageBucket: "baby-scorecard.appspot.com",
  messagingSenderId: "146839958959"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
