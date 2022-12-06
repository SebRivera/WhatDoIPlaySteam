import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './cred.js';


var firebaseConf = firebaseConfig
 
// Initialize Firebase
const app = initializeApp(firebaseConf);
var db = getFirestore(app);

export default db;
