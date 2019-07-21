import { ADD_NOTE, DELETE_NOTE, EDIT_NOTE, FETCH_NOTES } from './actionType'
import firebase from 'firebase';
import {app } from '../base'
import { readFile } from 'fs';



const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

let userNotes = db.collection('Notes');


export function fetchNotes(nickname) {
    return dispatch => {
        userNotes.orderBy('user').onSnapshot(snapshot => {
            let notes = snapshot.docChanges();
            notes.forEach(note => {
                if(note.doc.data().user == nickname) {
                    dispatch({
                        type: FETCH_NOTES,
                        text: note.doc.data().note,
                        id: note.doc.data().id,
                        user: note.doc.data().user,

                    })
                }
            })
        })
    }
}


export function addNote  (text, nickname, randNo) { 
    return dispatch => {
        const add = db.collection('Notes').add({
           user: nickname,
           note: text,
           id: randNo,
        });
        dispatch({
            type: ADD_NOTE,
            text,
            randNo,
            nickname
        })
    }
}

export  function deleteNote (id) { 
    return dispatch => {
        db.collection('Notes').where('id', '==', id).get().then(snapshot=>{
            snapshot.forEach(note=>{
                db.collection('Notes').doc(note.id).delete()
            })
        }).then( 
   dispatch({
    type: DELETE_NOTE,
    id
 })  )
} }

export  function editNote (id, text) {
    return dispatch => {
      let b = db.collection('Notes').where('id', '==', id ).get().then(snapshot => {
         snapshot.forEach(note=> {
        console.log(note.id)
        db.collection('Notes').doc(note.id).update({note: text})
      }) 
      });  
    dispatch({
    type: EDIT_NOTE,
    id,
    text
  })
  } }
  