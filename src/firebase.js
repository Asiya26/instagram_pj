// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from 'firebase'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'


const firebaseApp =  initializeApp({
    apiKey: "AIzaSyD2g3sT9zRIFaLJUOpcvEm4q035QA4XvXE",
    authDomain: "instagram-dcccd.firebaseapp.com",
    databaseURL: "https://instagram-dcccd-default-rtdb.firebaseio.com",
    projectId: "instagram-dcccd",
    storageBucket: "instagram-dcccd.appspot.com",
    messagingSenderId: "348787850023",
    appId: "1:348787850023:web:b44734f68b5e0c32640702",
    measurementId: "G-60LJQVQS4F"
  });
  
  
  
  export const db = getFirestore(firebaseApp)
  export const auth = getAuth(firebaseApp)
  export const storage = getStorage()

  // export { db, auth, storage }