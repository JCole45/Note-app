import React, { Component } from 'react';
import { addNote, editNote, deleteNote, fetchNotes } from '../Actions/actionCreator';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { app, sign } from '../base';
import 'firebase/auth';
import firebase from 'firebase';
import uuidv4 from 'uuid/v4'


const now = new Date;
const b = {
    random: [1,3,'r',6,'a','u',98,232]
}



class Notes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notes: '',
            id: '',
            user: ''
        }
        this.onAddNote = this.onAddNote.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.authListener = this.authListener.bind(this)

    }

    authListener() {
        app.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.displayName });
            } else {
                this.setState({ user: null })
            }
        })
    }

    componentDidMount() {
        this.authListener();

        app.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.fetchNotes(user.displayName);
            }
        })
        console.log(this.state.user)
    }


    onAddNote(e) {
        this.setState({
            notes: e.target.value
        })
    }

    onEnterNote(e) {
        if (e.key == 'Enter') {
            this.props.addNote(this.state.notes, this.state.user, uuidv4());
            this.setState({ notes: '' })
        }
    }

    onDelete(e) {
        this.props.deleteNote(e)
    }

    render() {
        const {
            user,
            signOut,
            signInWithGoogle,
        } = this.props;
        console.log(this.props)

        return (

            <div>

                <input onChange={this.onAddNote}
                    value={this.state.notes}
                    placeholder="notes..."
                    onKeyPress={this.onEnterNote.bind(this)} />

                <button onClick={() => {
                    this.props.addNote(this.state.notes, this.state.user, uuidv4()) ;
                    this.setState({ notes: '' })
                }} > add </button>



                <div>
                     
                    {this.props.notes.map((n) => (<div> 
                        <span >
                            <ul><li >{n.text} <button onClick={() => { this.props.editNote(n.id, prompt("enter new note"))}}>edit</button>
                                <button onClick={() => this.onDelete(n.id)}>delete</button>
                            </li></ul>  </span>
                    </div>))}
                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.Notes
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addNote, editNote, deleteNote, fetchNotes
    }, dispatch)
}




export default connect(mapStateToProps, mapDispatchToProps)(Notes);


