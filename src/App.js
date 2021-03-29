import React, { Component } from 'react';

import firebase from "firebase/app";
import './App.css';
import { useState, useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import TodoInput from './components/todoInput';
import TodoList from './components/showToDolist';
import Button from '@material-ui/core/Button';
import { db} from './firebase_config';
import Aux from './hoc/auxx';
import classes from './App.css';
import MainTodo from './components/mainToDo';
import Login from './containers/signIn';
import SignUp from './containers/signUp';
import { connect } from 'react-redux';
import * as action from './store/actions/index';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import { satisfies } from 'semver';

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
                <Route path="/ToDos"  component={MainTodo}/> 
                <Redirect to="/ToDos" />
              </Switch>
        )
      }
      else{
        page=(
          <Switch>
            <Route path="/SignUp"  component={SignUp}/> 
            <Route path="/SignIn" exact component={Login}/> 
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
  console.log("{App.js ToDo}",state.data.todos)
  return{
    todos:state.data.todos,
    signedIn:state.auth.signedIn
  }

}

const mapDispatchToProps=dispatch=>{
  return{
    getTodo:()=> dispatch(action.getTodo()),
    authCheckState:()=>dispatch(action.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
