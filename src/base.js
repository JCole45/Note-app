import firebase from 'firebase'
import 'firebase/auth';


const app = firebase.initializeApp({
    apiKey: "AIzaSyCIUhljBhiQTC-QUbDj72eVARy4UPngH1k",
    authDomain: "notes-app-62af4.firebaseapp.com",
    databaseURL: "https://notes-app-62af4.firebaseio.com",
    projectId: "notes-app-62af4",
    storageBucket: "notes-app-62af4.appspot.com",
    messagingSenderId: "606484388490",
    appId: "1:606484388490:web:7e867a5c4124f9ec"
})

const sign= app.auth()

export { app , sign }
