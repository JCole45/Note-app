import { ADD_NOTE, DELETE_NOTE, EDIT_NOTE, FETCH_NOTES } from '../Actions/actionType'
import { combineReducers } from 'redux'
import { bindActionCreators } from 'redux';

function removeDuplicates(arr, comp) {

    const unique = arr
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e]).map(e => arr[e]);

    return unique; 
}



const Notes = (state = [], action) => {
    switch (action.type) {
        case ADD_NOTE:

            return [...state, {
                id: action.randNo,
                text: action.text,
                user: action.nickname
            }]

        case FETCH_NOTES:
        if (action.id == state.id ){
        return  removeDuplicates(
            [...state, {
            id: action.id,
            text: action.text,
            user: action.user
        }],'id') }

        case EDIT_NOTE:
            return state.map((i) => {
                if (i.id == action.id) {
                    return {
                        ...i,
                        text: action.text
                    }
                } return i

            })

        case DELETE_NOTE:
            return state.filter(i => i.id !== action.id)


        default:
            return (state)
    }
}
console.log(Notes.state)


export default combineReducers({
    Notes
})

