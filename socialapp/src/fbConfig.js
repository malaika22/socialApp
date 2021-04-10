 import firebase from 'firebase/app'
 import 'firebase/auth'
 
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBhGPQthVLk8spUd_A4uoApbZx4WvuK7c8",
    authDomain: "socio-5a611.firebaseapp.com",
    projectId: "socio-5a611",
    storageBucket: "socio-5a611.appspot.com",
    messagingSenderId: "979668077206",
    appId: "1:979668077206:web:b95aee0cd6d653512dd0b7",
    measurementId: "G-J8NMQ9SC9S"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

export default firebase