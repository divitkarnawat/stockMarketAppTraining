import React from 'react';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const axios = require('axios');

const textFieldLabels = ["Username","Password","Email","Mobile Number"];
const textFieldNames = ["name","password","email","mobileNumber"];
const textFieldTypes = ["text","password","text","text"];

export default class SignUpPage extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            details: {
                name: "",
                password: "",
                email:"",
                admin: false,
                role: "User",
                mobileNumber:""

            },
            errors:{
                name: "",
                password: "",
                email:"",
                mobileNumber:""

            },
            globalError: "",
            open: false
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
            let sendDetails = this.state.details;
            sendDetails.role = sendDetails.admin?"Admin" : "User";
            axios.post('http://localhost:8080/register', sendDetails)
              .then(response=> {
                this.setState({
             
                    details: {
                        name: "",
                        password: "",
                        email:"",
                        admin: false,
                        role: "User",
                        mobileNumber:""
        
                    },
                    errors:{
                        name: "",
                        password: "",
                        email:"",
                        mobileNumber:""
        
                    },
                    globalError: "",
                    open: true
                
            })
            //  setTimeout(this.props.history.push('/user/signin'), 6000);
              })
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
                <h1> Sign Up</h1>
                
                <form  autoComplete="off" onSubmit = {this.handleSubmit}>
                    {
                        textFieldNames.map((tfn,id) => (
                            <TextField 
                        type = {textFieldTypes[id]}
                        required
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
                    <TextField 
                        disabled
                        id='role'
                        name='role'
                        label='Role'
                        fullWidth
                        value = {this.state.details.admin? "Admin":"User"}
                         />
                    <div>
                        User
                    <FormControlLabel style={{margin: `0 6px`}}
        control={<Switch checked={this.state.admin} onChange={(e)=>this.handleChange(e.target.name, !this.state.details.admin)} name="admin" />}
        color="primary"
      />
      Admin
      </div>
                    

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
                <Button
                        variant="contained"
                        color="primary"
                        className="submitBtn"
                        size="large"
                        style={{marginTop: `20px`}}
                        href = "http://localhost:3000/user/signin"
                        endIcon={<SendIcon />}
                    >
                        Sign In
                    </Button>
                <Snackbar open={this.state.open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={this.handleClose}>
                <MuiAlert variant = 'filled' onClose={this.handleClose} severity={this.state.globalError ? "error" : "success"}>
           {
               this.state.globalError == "" ? `Click on the link sent to mail`  : this.state.globalError
           }
        </MuiAlert>
      </Snackbar>
            </div>
        );
    }
}