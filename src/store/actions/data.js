import * as actionTypes from './actionTypes';
import firebase from 'firebase/app';
import { db } from '../../firebase_config';

export const addTodo =(e) => {
    //console.log("added");
    //e.preventDefault();

    if(this.state.todoInput!='Enter Your ToDo'){
    db.collection("todoList").add({
        inprogress: true,
        timestmp: firebase.firestore.FieldValue.serverTimestamp(),
        todo:this.state.todoInput
    });
    this.setState({todoInput : 'Enter Your ToDo' , updatePage : true});
    this.setState({getTodoCallAgain:true});
    }


}





export const shortData=(data)=>{
    return (dispatch)=>{
        const myData = [].concat(...data)
        .sort((a, b) => a.timestmp < b.timestmp ? 1 : -1);
        //console.log("shortded: ",myData);
        
        dispatch(getToDoSucess(myData));
    }
}



export const  getToDoSucess=(todos)=>{
    return{
        type:actionTypes.GET_TODO_SUCCESS,
        todos:todos
    }
}

export const  getToDoFailed=(err)=>{
    return{
        type:actionTypes.GET_TODO_FAILED,
        error:err
    }
}

export const getTodo= (getTodoCallAgain) =>{
    
    return (dispatch)=>{
       
        //db.collection("todoList").where("userID", "<", "3").limit(100).get().then(snapshot => {
        db.collection("todoList").get().then(snapshot => {
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
        
        dispatch(shortData(list));
      
    // this.setState({todos : todoData})


        if(getTodoCallAgain){
        console.log("Added::")
        //this.setState({getTodoCallAgain : false})
        getTodoCallAgain=false;
        this.getTodo();   
          //this.getTodo();   
        }

        })
        .catch( error =>getToDoFailed(error))
        //this.forceUpdate();
    }
}



export const deleteTodo =(id) => {

    db.collection("todoList").doc(id).delete();
    this.setState({updatePage : true ,updateCounter:this.state.updateCounter+1,getTodoCallAgain:true});
    //this.forceUpdate();
   // setTimeout(() => { window.location.reload(false); }, 400);
    
    
} 



export const todoInputUpdate=(event)=>{
    this.setState({todoInput:event.target.value})
}




export const updateTodo=(id,inprogress)=>{
    db.collection("todoList").doc(id).update({inprogress: !inprogress});
    this.setState({updatePage : true ,updateCounter: this.state.updateCounter+1});
    this.forceUpdate();
    //setTimeout(() => {  window.location.reload(false); }, 800); 
  }