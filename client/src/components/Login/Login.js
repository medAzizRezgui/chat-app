import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import classes from '../../styles/css/Login.module.css'
import validator from 'validator'


const Login = (props) => {

    return (

        <div className={classes.login}>
            <form className={classes.root} Validate autoComplete="off">
                <LockIcon className={classes.icon}></LockIcon>
                <h2>Hey, Welcome Back!</h2>
                <TextField

                    className={classes.email} id="standard-basic"
                    label="Your Email" />
                <TextField required className={classes.pass} id="standard-password-input" type="password" label="Password" />

                <p className={classes.forget}>Forget your password?</p>


                <Button className={classes.btn} variant="contained">
                    Log in
                </Button>
                <p className={classes.create}>Don't have an account? <span>
                    Create One
                </span></p>
            </form>
        </div>

    )

};

export default Login;