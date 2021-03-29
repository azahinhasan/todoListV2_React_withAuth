import * as actionTypes from '../actions/actionTypes';
import { db } from '../../firebase_config';


let stateOFtodo={
    updateCounter:0,
    updatePage:false,
    todoInput:'Enter Your ToDo',
    getTodoCallAgain:false,
    todos:null,
    darkMood:false,
}
const reducer =(state=stateOFtodo,action)=>{

    switch(action.type){

        case actionTypes.GET_TODO_SUCCESS:
            return{
                ...state,
                todos:action.todos
            };

        default:
            return state
    }


}

export default reducer;