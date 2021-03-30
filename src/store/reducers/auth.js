
import * as actionTypes from '../actions/actionTypes';

const initialState={
    signedIn:false,
    error:'',
    userId:'',
    name:'',
    loading:false
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
        case actionTypes.LODING_START: 
            return {
                ...state,
                loading:true
            };
        case actionTypes.LODING_STOP: 
            return {
                ...state,
                loading:false
            };

        default:
            return state;
    }
};


export default reducer;