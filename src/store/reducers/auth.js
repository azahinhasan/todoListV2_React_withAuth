
import * as actionTypes from '../actions/actionTypes';

const initialState={
    signedIn:false,
    error:'',
    userId:'',
    name:''
}
const reducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case actionTypes.AUTH_SUCCESS: 
            return {
                ...state,
                signedIn:action.signedIn,
                userId:action.userId,
                name:action.name
            };

        case actionTypes.AUTH_FAILED: 
            return {
                ...state,
                signedIn:action.signedIn,
                error:action.error
            };
        case actionTypes.AUTH_LOGOUT: 
            return {
                ...state,
                signedIn:false
            };

        default:
            return state;
    }
};


export default reducer;