import React, { Component } from 'react';
import classes from '../App.css'
import firebase from "firebase/app";
import { useState, useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import TodoInput from './todoInput';
import TodoList from './showToDolist';
import Button from '@material-ui/core/Button';
import { db} from '../firebase_config';
import Aux from '../hoc/auxx';
import { connect } from 'react-redux';
import * as action from '../store/actions/index';
import classesBtn from '../../src/button.css';
import Spinner from '../ui/Spinner';

let a = false;
class App extends Component {

  state={
    updateCounter:0,
    updatePage:false,
    todoInput:'Enter Your ToDo',
    getTodoCallAgain:false,
    todos:[],
    darkMood:false,
    loading:false
    //   inprogress:''
    // },
    // todos:[ {id: "fafdafa",todo:"hello",inprogress: true},
    // {id: "fafdfa",todo:"fuck you.you are totally shit hofie hofaie hafoe l",inprogress: true}]
  }

  
  componentDidMount(){
   //console.log("[App.js] componentDidMount");
    this.setState({loading: true})
    this.getTodo();
  }
  componentDidUpdate(){
    if(this.state.updatePage){
      //console.log("[App.js] componentDidUpdate");
      this.getTodo();
      this.setState({updatePage : false});
    }
  }



addTodo =(e) => {

    if(this.state.todoInput!='Enter Your ToDo'){
      db.collection("todoList").add({
        inprogress: true,
        timestmp: firebase.firestore.FieldValue.serverTimestamp(),
        todo:this.state.todoInput,
        userId:this.props.userId
      });
    this.setState({todoInput : 'Enter Your ToDo' , updatePage : true});
    this.setState({getTodoCallAgain:true});
    }
  }


  shortData=(data)=>{
    const myData = [].concat(...data)
    .sort((a, b) => a.timestmp < b.timestmp ? 1 : -1);
    //console.log("shortded: ",myData);
    return myData;
  }


  getTodo= () =>{
    
    db.collection("todoList").where("userId", "==", this.props.userId).limit(100).get().then(snapshot => {
      //db.collection("todoList").get().then(snapshot => {
      const list =[];
      snapshot.forEach(doc => {

        let dateTime =(doc.data().timestmp);
        let time=dateTime && dateTime.toDate && dateTime.toDate()
        //console.log(time)

        const data = {
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
          timestmp:time
        }
        list.push(data);

      })
      


    let todoData=this.shortData(list);

    this.setState({todos :this.shortData(list)});

    this.setState({loading: false})
    if(this.state.getTodoCallAgain){
      console.log("Added::")
      this.setState({getTodoCallAgain : false})
      this.getTodo();   
      this.getTodo();   
    }

    })
    .catch( error => console.log(error))
    this.forceUpdate();
  }
  

  deleteTodo =(id) => {

    db.collection("todoList").doc(id).delete();
    this.setState({updatePage : true ,updateCounter:this.state.updateCounter+1,getTodoCallAgain:true});
    //this.forceUpdate();
   // setTimeout(() => { window.location.reload(false); }, 400);
    
    
  } 



  todoInputUpdate=(event)=>{
    this.setState({todoInput:event.target.value})
  }

  hideValueOfInput=()=>{
    if(this.state.todoInput== "Enter Your ToDo"){
      this.setState({todoInput:""})
    }
  }



  updateTodo=(id,inprogress)=>{
    db.collection("todoList").doc(id).update({inprogress: !inprogress});
    this.setState({updatePage : true ,updateCounter: this.state.updateCounter+1,getTodoCallAgain:true});
    this.forceUpdate();
    this.setState({});
    //setTimeout(() => {  window.location.reload(false); }, 800); 
  }


  render(){
    
    let pageData = null;

    if(this.state.loading){
      pageData = <Spinner/>
    }
    else if(this.state.todos && !this.state.loading){
      
      pageData = (
        <div>
          <div className={classes.userName}>
            Hi,{this.props.name.split(' ')[0]}
          </div>
          
          <h1>ToDo List</h1>
          <TodoInput
          key={4}
          add={this.addTodo}
          state={this.state}
          hideValueOfInput={this.hideValueOfInput}
          todoInputUpdate={this.todoInputUpdate}
          />
          <TodoList
          key={1}
          todos={this.state.todos}
          delete={this.deleteTodo}
          update={this.updateTodo}
          /> 
         
          {/* <button onClick={this.getTodo}>hhh</button> */}
        </div>
      );
    }

    return(

      <div>
        <button className={classesBtn.button,classesBtn.Logout} onClick={this.props.logOut}>LogOut</button>
        {pageData}
        {/* <Spinner/> */}
      </div>
    
    )
  }

}

const mapStateToProps=state=>{
  return{
    userId:state.auth.userId,
    name:state.auth.name,
    signedIn:state.auth.signedIn
  }

}

const mapDispatchToProps=dispatch=>{
  return{
    getTodo:()=> dispatch(action.getTodo()),
    logOut:()=>dispatch(action.logOut())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
