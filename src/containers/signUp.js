import React, { Component } from 'react';

import classesBtn from '../../src/button.css';
import classes from './auth.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../store/actions/index';

import fbIcon from '../ui/icon/fb.png';
import googleIcon from '../ui/icon/goo.png';

class SignUP extends Component{

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
        },
        name:{
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
        //console.log(value);
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
            else if( type=='name'){
                this.setState({
                    name:{
                        value:event.target.value,
                        valid:this.checkValidity(event.target.value,'name')
                    }
                })
            }
        
    }

    demo=()=>{
        console.log('demo')
    }

    nowSignUp=()=>{
        this.props.SignUp(this.state.email.value,this.state.password.value,this.state.name.value);
    }

    render(){

        let buttonDisable=true;
        if(this.state.password.valid && this.state.email.valid&& this.state.name.valid){
            buttonDisable=false;
        }
        let error=this.props.error;

        return(
            <div className={classes.SignInSignUpTextBox}>
                <h1>ToDo List WebApp</h1>
                <hr/>
                <h2>Sign Up Page</h2>
                <input type="text" name="name" placeholder='Name' onChange={(event)=>this.inputChangedHandler(event,'name')} />
                <br/>
                <input type="email" name="email" placeholder='Email' onChange={(event)=>this.inputChangedHandler(event,'email')}/>
                <br/>
                <input type="password" placeholder='Password(more then 6 digit/char)' onChange={(event)=>this.inputChangedHandler(event,'pass')}/>
                
                <div className={classes.error} >{error}</div>
                
                <button className={classesBtn.signInsignUp} onClick={this.nowSignUp} disabled={buttonDisable}>
                SignUp</button>
                <br/>
                or
                <br/>
                <button className={classesBtn.withGoogle} onClick={this.props.logInWithGoogle}>
                <img className={classes.googleIcon} src={googleIcon}/>
                   &nbsp; &nbsp; &nbsp; SignUp With Google
                </button>
                <br/>
                <button className={classesBtn.withFacebook} onClick={this.props.logInWithFacebook}>
                <img className={classes.googleIcon} src={fbIcon}/>
                   &nbsp; &nbsp; &nbsp;  &nbsp; SignUp With Facebook
                </button>
                <br/>
                <NavLink to={{pathname: '/SignIn'}}  disabled={buttonDisable}>
                ←← Already have an acount?</NavLink>

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
       
        SignUp:(email,password,name)=> dispatch( 
            action.SignUp(email,password,name)),
        logInWithGoogle:()=>dispatch(action.logInWithGoogle()),
        logInWithFacebook:()=>dispatch(action.logInWithFacebook())
    }
  }

export default connect(npmStateToProps,mapDispatchToProps)(SignUP);