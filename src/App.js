import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Notes from './Container/Notes'
import firebase from 'firebase';
import {app, sign  } from './base';
import withFirebaseAuth from 'react-with-firebase-auth'



class App extends Component {

render (){
  const {
    user,
    signOut,
    signInWithGoogle,
  } = this.props;
  console.log({user})

  return (
    <div>

      {user ? <button onClick={signOut}>Sign Out</button> : 
      <button onClick={signInWithGoogle}>signInWithGoogle</button> } 

      {user ? <div><p>Welcome {user.displayName}</p> 
      <Notes /> </div>: <p>Sign in with Google </p>}
      
      

    </div>

  );
}  
}

const firebaseAppAuth = sign;

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};


export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
