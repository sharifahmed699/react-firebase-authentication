import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const firebaseInitiatizaAuth = ()=>{
    initializeApp(firebaseConfig);
}

export default firebaseInitiatizaAuth