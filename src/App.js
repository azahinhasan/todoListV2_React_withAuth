// import firebase from "firebase/app";
// import { useState, useEffect} from "react";
// import TextField from '@material-ui/core/TextField';
// import TodoInput from './components/todoInput';
// import TodoList from './components/showToDolist';
// import Button from '@material-ui/core/Button';
// import { db} from './firebase_config';
// import Aux from './hoc/auxx';
// import { satisfies } from 'semver';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './store/actions/index';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';

import './App.css';
import classes from './App.css';
import asyncComponent from './hoc/asyncComponent';



const asyncToDos=asyncComponent(()=>{ 
    return import('./components/mainToDo');
});

const asyncSingnIn=asyncComponent(()=>{ 
  return import('./containers/signIn');
});
const asyncSignUp=asyncComponent(()=>{ 
  return import('./containers/signUp');
});

let a = false;
class App extends Component {

  state={
    updateCounter:0,
    updatePage:false,
    todoInput:'Enter Your ToDo',
    getTodoCallAgain:false,
    // tode:{
    //   id:'',
    todos:[],
    darkMood:false,
    //   inprogress:''
    // },
    // todos:[ {id: "fafdafa",todo:"hello",inprogress: true},
    // {id: "fafdfa",todo:"fuck you.you are totally shit hofie hofaie hafoe l",inprogress: true}]
  }

  componentDidMount(){
    this.props.authCheckState();
  }


  render(){
    
      let page=null;
      if(this.props.signedIn){
        page=(
              <Switch>
                <Route path="/ToDos"  component={asyncToDos}/> 
                <Redirect to="/ToDos" />
              </Switch>
        )
      }
      else{
        page=(
          <Switch>
            <Route path="/SignUp"  component={asyncSignUp}/> 
            <Route path="/SignIn" exact component={asyncSingnIn}/> 
            <Redirect to="/SignIn" />
          </Switch>
    )
      }
    return(
      <div className={classes.App}>
        {page}
      </div>
    )


  }

}

const mapStateToProps=state=>{
  return{
    signedIn:state.auth.signedIn
  }

}

const mapDispatchToProps=dispatch=>{
  return{
    authCheckState:()=>dispatch(action.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

