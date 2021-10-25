import firebase from "firebase";
import "firebase/firestore";

export const app = firebase.initializeApp({
  apiKey: "AIzaSyBE2d0RzvL4QWHG1vFs6XLe6XetfurOW4A",
  authDomain: "codelab-hotel.firebaseapp.com",
  projectId: "codelab-hotel",
  storageBucket: "codelab-hotel.appspot.com",
  messagingSenderId: "141857957128",
  appId: "1:141857957128:web:ca73e209cbf9cfd4c8f8bd",

  // apiKey: "AIzaSyBIFAR7iERJaF7-rjj0xl_i0jUoj7kaH-s",
  // authDomain: "codelab-admission.firebaseapp.com",
  // projectId: "codelab-admission",
  // storageBucket: "codelab-admission.appspot.com",
  // messagingSenderId: "640840343091",
  // appId: "1:640840343091:web:bd8ed03471380307d04d46",
});
