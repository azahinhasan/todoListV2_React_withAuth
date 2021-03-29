import React, { Component } from 'react';

import classesBtn from '../../src/button.css';
import classes from './auth.css';

import {connect} from 'react-redux';
import * as action from '../store/actions/index';


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
            <div className={classes.SignInTextBox}>
                <h1>Sign In Page</h1>
                <input type="email" name="email"  placeholder='Email' onChange={(event)=>this.inputChangedHandler(event,'email')}/>
                <br/>
                <input type="password" placeholder='Password' onChange={(event)=>this.inputChangedHandler(event,'pass')}/>
                
                <div className={classes.error} >{error}</div>
                
                <button className={classesBtn.signInsignUp} onClick={this.nowSignIn} disabled={buttonDisable}>
                SignIn</button>
                <br/>
                <a href='/SignUp' disabled={buttonDisable}>
                I donn't have account →→
                </a>

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
            action.SignIn(email,password))
    }
  }

export default connect(npmStateToProps,mapDispatchToProps)(Auth);