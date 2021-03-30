import React, { Component } from 'react';

import classesBtn from '../../src/button.css';
import classes from './auth.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../store/actions/index';
import fbIcon from '../ui/icon/fb.png';
import googleIcon from '../ui/icon/goo.png';

class Auth extends Component{

    state={
        email:{
            value:'',
            valid:'',
            touched:false
        },
        password:{
            value:'',
            valid:'',
            touched:false
        }
    }

checkValidity(value,type) {
    let isValid =true;

    if(value==''){
        return false;
    }

    if(type=='email'){
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) ;
    }

    if(type=='pass'){
        isValid = value.length >= 6 ;
        console.log(value);
    }
    return isValid;


}
    inputChangedHandler=(event,type)=>{
            if( type=='email'){
                this.setState({
                    email:{
                        value:event.target.value,
                        valid:this.checkValidity(event.target.value,'email')
                    }
                })
            }
            else if( type=='pass'){
                this.setState({
                    password:{
                        value:event.target.value,
                        valid:this.checkValidity(event.target.value,'pass')
                    }
                })
            }
        
    }

    demo=()=>{
        console.log('demo')
    }

    nowSignIn=()=>{
        this.props.SignIn(this.state.email.value,this.state.password.value);
    }

    render(){

        let buttonDisable=true;
        if(this.state.password.valid && this.state.email.valid){
            buttonDisable=false;
        }
        let error=this.props.error;
        return(
            <div className={classes.SignInSignUpTextBox}>
                <h1>ToDo List WebApp</h1>
                <hr/>
                <h2>Sign In Page</h2>
                <input type="email" name="email"  placeholder='Email' onChange={(event)=>this.inputChangedHandler(event,'email')}/>
                <br/>
                <input type="password" placeholder='Password' onChange={(event)=>this.inputChangedHandler(event,'pass')}/>
                
                <div className={classes.error} >{error}</div>
                
                <button className={classesBtn.signInsignUp} onClick={this.nowSignIn} disabled={buttonDisable}>
                SignIn</button>
                <br/>
                or
                <br/>
                <button className={classesBtn.withGoogle} onClick={this.props.logInWithGoogle}>
                <img className={classes.googleIcon} src={googleIcon}/>
                   &nbsp; &nbsp; &nbsp; SignIn With Google
                </button>
                <br/>
                <button className={classesBtn.withFacebook} onClick={this.props.logInWithFacebook}>
                <img className={classes.googleIcon} src={fbIcon}/>
                   &nbsp; &nbsp; &nbsp;  &nbsp; SignIn With Facebook
                </button>
                <br/>

                <NavLink to={{pathname: '/SignUp'}}  disabled={buttonDisable}>
                I donn't have account →→
                </NavLink>
                

            </div>
        )
    }
}

const npmStateToProps=state=>{
    return{
        error:state.auth.error
    }
  }
  
  const mapDispatchToProps=dispatch=>{
    return{
       
        SignIn:(email,password)=> dispatch( 
            action.SignIn(email,password)),
        logInWithGoogle:()=>dispatch(action.logInWithGoogle()),
        logInWithFacebook:()=>dispatch(action.logInWithFacebook())
    }
  }

export default connect(npmStateToProps,mapDispatchToProps)(Auth);