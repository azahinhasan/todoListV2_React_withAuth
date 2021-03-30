import React, { Component } from 'react';
import classes from  './Spinner.css';

class spinner extends Component {

    render() {
        return (
            <div className={classes.loader}>
                Loading....
            </div> 
        );
    }
    }
    
    export default spinner;