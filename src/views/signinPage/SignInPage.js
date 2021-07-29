import React from 'react';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const axios = require('axios');

const textFieldLabels = ["Username","Password"];
const textFieldNames = ["username","password"];
const textFieldTypes = ["text", "password"];

export default class SignInPage extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            details: {
                username: "",
                password: "",
                

            },
            errors:{
                username: "",
                password: "",
               
            },
            globalError: "",
            open: false,
            submitStatus: false
        }
    }

    handleClose = () =>
    {
        this.setState({
            open: false
        });
    }

    handleChange = (name,value) =>
    {
        let errors = this.state.errors;   
        // errors[name] = (value=="")? "This field is required" : "";
    
        this.setState(prevState=>{
            return({
                errors,
            details: {
                ...prevState.details,
                [name]: value
            }
        }
            );
        })
        
    }

    
    checkErrors = ()=>
    {
        return !(Object.values(this.state.errors).every(val=>val==""));
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if(!this.checkErrors())
        {
            
            
            axios.post('https://stock-market-app-java-divitk.herokuapp.com/authenticate', this.state.details)
              .then(response=> {
                  
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('admin', response.data.admin);
                localStorage.setItem('userId', response.data.userId);
                this.setState({
             
                    details: {
                        username: "",
                        password: "",
                        
        
                    },
                    errors:{
                        username: "",
                        password: "",
                        
        
                    },
                    globalError: "",
                    open: true,
                    submitStatus: true
                
            });       })
              .catch((error)=> {
                this.setState({
                    globalError: error.response.data.details[0],
                    open: true
                })
              });
        }
    }


    render()
    {
        
        return(
            <div className = "container">
                <h1> Sign In</h1>
                 
                <form  autoComplete="off" onSubmit = {this.handleSubmit}>
                    {
                        textFieldNames.map((tfn,id) => (
                            <TextField 
                        required
                        type = {textFieldTypes[id]}
                        id={tfn}
                        name={tfn}
                        label={textFieldLabels[id]}
                        fullWidth
                        placeholder ={`Enter your ` + textFieldLabels[id] }
                        value = {this.state.details[tfn]}
                        onChange = {(e)=>this.handleChange(e.target.name, e.target.value)}
                        error = {this.state.errors[tfn]!=""}
                        helperText = {this.state.errors[tfn]} 
                         />
                        ))
                    }
                   
                    
                    

                    <Button
                        variant="contained"
                        color="primary"
                        className="submitBtn"
                        size="large"
                        type="submit"
                        disabled = {this.checkErrors()}
                        endIcon={<SendIcon />}
                    >
                        Submit
                    </Button>
                    
                </form>

                {
                    this.state.submitStatus ? <Button
                    variant="contained"
                    color="primary"
                    className="submitBtn"
                    size="large"
                    style={{marginTop: `20px`}}
                    href = "https://stock-market-application-divit.herokuapp.com/companies"
                    endIcon={<SendIcon />}
                >
                   Continue
                </Button> : ""
                }
                
               
                <Snackbar open={this.state.open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={this.handleClose}>
                <MuiAlert variant = 'filled' onClose={this.handleClose} severity={this.state.globalError ? "error" : "success"}>
           {
               this.state.globalError == "" ? `Logged in successfully`  : this.state.globalError
           }
        </MuiAlert>
      </Snackbar>
            </div>
        );
    }
}