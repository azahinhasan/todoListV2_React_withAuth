import React, { Component } from 'react';

import firebase from "firebase/app";
import { useState, useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classes from './showToDolist.css';
import classesBtn from '../button.css';

class todoList extends Component{

    
    componentDidUpdate(prevProps,prevState){
        if(this.props.todos !== prevProps.todos){
          return true;
        }
        return false
      }
    
    render(){
        let noTask= '';
        if (this.props.todos.length == 0) 
        {
            noTask = <h2>No Task Left!</h2>
        }
        return(

            <div>

            {noTask}
            <table>
                <tbody>
                    {this.props.todos.map(todo =>{
                        return(
                        <tr key={todo.id}>
                            <td className={todo.inprogress? classes.dataNotDone : classes.dataDone}>
                                {/*console.log("Pro " +String(todo.inprogress))*/}
                                
                                {todo.todo} 
                            </td>

                            <td>
                                <button className={classesBtn.button} onClick={this.props.update.bind(this,todo.id,todo.inprogress)}>✔</button>
                                <div className={classesBtn.divider}></div>
                                <button className={classesBtn.button} onClick={this.props.delete.bind(this,todo.id)}>✖</button>
                            </td>
                        </tr>
                        )})}
                </tbody>
            </table> 
            </div>
        )
    
}
}

export default todoList;