import * as actionTypes from './actionTypes';
import firebase from 'firebase/app';
import { db } from '../../firebase_config';
import axios from 'axios';


export const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        signedIn: true,
        userId:localStorage.getItem('userId'),
        name:localStorage.getItem('displayName'),
        token:localStorage.getItem('token')
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        signedIn: false,
        error:error
    };
};

export const SignIn=(email,password)=>{
    return (dispatch)=>{

        const authData ={
            email: email,
            password: password
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvqfm2zNHYHKAN75c_FwjViuJhe6HneaI';
        axios.post(url,authData)
        .then(response=>{
            //const exiprationDate =new Date((new Date().getTime()+response.data.expiresIn)*1000);

            console.log(response);
            localStorage.setItem('token',response.data.idToken);
            //localStorage.setItem('exiprationDate',exiprationDate);
            localStorage.setItem('userId',response.data.localId);
            localStorage.setItem('displayName',response.data.displayName);

            dispatch(authSuccess());

        }).catch(err=>{
            dispatch(authFailed(err.response.data.error.message));
        })

    }
}


export const storeDataInDB=(name,userID)=>{
    return (dispatch)=>{
        db.collection("userInfo").add({
            Name: name,
            UserID:userID,
            SignUpDate:new Date()
        });
    }
}


export const SignUp=(email,password,name)=>{
    return (dispatch)=>{

        const authData ={
            email: email,
            password: password,
            displayName:name
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvqfm2zNHYHKAN75c_FwjViuJhe6HneaI';
        axios.post(url,authData)
        .then(response=>{
            const exiprationDate =new Date((new Date().getTime()+response.data.expiresIn)*1000);
            //console.log(response);
            // localStorage.setItem('token',response.data.idToken);
            // localStorage.setItem('exiprationDate',exiprationDate);
            // localStorage.setItem('userId',response.data.localId);
            dispatch(storeDataInDB(name,response.data.localId));

            dispatch(SignIn(email,password));
          

        }).catch(err=>{
            dispatch(authFailed(err.response.data.error.message));
        })

    }
}




export const logInWithGoogle =() => {

    var provider = new firebase.auth.GoogleAuthProvider();

    return dispatch =>firebase.auth().signInWithPopup(provider).then((response)=>{
            console.log(response.user.ja.X);
            console.log(response)
            localStorage.setItem('token',response.credential.idToken);
            localStorage.setItem('userId',response.user.ja.X);
            localStorage.setItem('displayName',response.additionalUserInfo.profile.name);
            dispatch(authSuccess());
        }).catch((err)=>{
            console.log(err)
        })
    
  }

 export const logInWithFacebook =() => {

    var provider = new firebase.auth.FacebookAuthProvider();

    return dispatch =>firebase.auth().signInWithPopup(provider).then((response)=>{
            console.log(response)
            localStorage.setItem('accessToken',response.credential.accessToken);
            localStorage.setItem('userId',response.user.ja.X);
            localStorage.setItem('displayName',response.additionalUserInfo.profile.name);
            dispatch(authSuccess());
        }).catch((err)=>{
            console.log(err)
        })
    
  }


export const logOut=()=>{

    localStorage.removeItem('token');
    localStorage.removeItem('displayName');
    localStorage.removeItem('userId');
    localStorage.removeItem('accessToken');

    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const authCheckState=()=>{
    return dispatch=>{
        const userId = localStorage.getItem('userId');
        if(!userId){
            dispatch(logOut());
        }else{
            dispatch(authSuccess(userId));
        }
    }
}