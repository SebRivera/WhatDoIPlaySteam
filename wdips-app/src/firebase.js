import firebase from 'firebase';
import firebaseConfig from './cred.js';


var firebaseConf = firebaseConfig
 
// Initialize Firebase
firebase.initializeApp(firebaseConf);
var db = firebase.firestore();

export default db;
