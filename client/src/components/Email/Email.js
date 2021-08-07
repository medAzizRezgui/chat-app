import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import classes from '../../styles/css/Login.module.css'


const Email = (props) => {



    return (


        <form className={classes.root} Validate autoComplete="off">

            <TextField

                className={classes.email} id="standard-basic"
                label="Your Email" />


        </form>


    )


}
    ;
export default Email;