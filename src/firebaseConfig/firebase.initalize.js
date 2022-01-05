import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";


const initialieAuthentication=()=>{
    initializeApp(firebaseConfig);
}

export default initialieAuthentication;

