import React from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const axios = require('axios')

export default class AddSector extends React.Component{
    
    constructor()
    {
        super();
        this.state = {
            details: {
                name: "",
                brief: ""
            },
            errors:{
                name:"",
                brief:""
            },
            globalError: "",
            open: false
        }
    }

    componentDidMount()
    {
        axios.get('http://localhost:8080/sectors/id/' + this.props.id)
        .then(response=> {
            console.log(response.data);
            this.setState({details: response.data});
        })
        .catch(error => console.log(error));
    }

    handleClose = () =>
    {
        this.setState({
            open: false
        });
    }

    resetForm = () =>{
        this.setState({
             
                details: {
                    name: "",
                    brief: ""
                },
                errors:{
                    name:"",
                    brief:""
                },
                globalError: ""
            
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        if(!this.checkErrors())
        {
            let sendData = this.state.details;
            sendData.id = this.props.id;
            axios.put(`http://localhost:8080/sectors/update/` + this.props.id, sendData)
              .then(response=> {
                this.setState({
             
                    details: {
                        name: "",
                        brief: ""
                    },
                    errors:{
                        name:"",
                        brief:""
                    },
                    globalError: "",
                    open: true
                
            })
                  
              })
              .catch((error)=> {
                this.setState({
                    globalError: error.response.data.details[0],
                    open: true
                })
              });
        }
        
    }

    handleChange = (e) =>{
        const {name, value} = e.target;
        let errors = this.state.errors;

        switch(name)
        {
            case "name":
                errors.name = (value== "") ? "This field is required" : "";
                break;
            case "brief":
                errors.brief =(value== "") ? "This field is required" : "";
                break;
            default: break;
        }

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

    render()
    {
        return(
            <div className = "container">
                <h1> Add a Sector</h1>
                 
                <form  autoComplete="off" onSubmit = {this.handleSubmit}>
                    <TextField 
                        required
                        id="name" 
                        name="name"
                        label="Name"
                        fullWidth
                        placeholder ="Enter name of Sector"
                        value = {this.state.details.name}
                        onChange = {this.handleChange}
                        error = {this.state.errors.name!=""}
                        helperText = {this.state.errors.name} 
                         />
                    
                    <TextField 
                        required
                        id="brief" 
                        name="brief"
                        label="Brief"
                        fullWidth
                        placeholder ="Enter brief of Sector"
                        value = {this.state.details.brief}
                        onChange = {this.handleChange}
                        error = {this.state.errors.brief!=""}
                        helperText = {this.state.errors.brief}
                         />
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
                <Snackbar open={this.state.open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={this.handleClose}>
                <MuiAlert variant = 'filled' onClose={this.handleClose} severity={this.state.globalError ? "error" : "success"}>
           {
               this.state.globalError == "" ? "Updated successfully" : this.state.globalError
           }
        </MuiAlert>
      </Snackbar>
            </div>
        );
    }
}