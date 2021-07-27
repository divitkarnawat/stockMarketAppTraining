import React from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SelectSector from '../SelectSector.js';

const axios = require('axios');

const textFieldLabels = ["Name","Turnover","Ceo","Board of Directors","Brief"];
const textFieldNames = ["name","turnover","ceo","boardOfDirectors","brief"];

export default class AddCompany extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            details: {
                name: "",
                turnover: "",
                ceo:"",
                boardOfDirectors:"",
                brief:"",
                sectorName:""

            },
            errors:{
                name: "",
                turnover: "",
                ceo:"",
                boardOfDirectors:"",
                brief:"",
                sectorName:""

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

    handleSelectChange = (value) =>
    {
        let errors = this.state.errors;   
        errors.sectorName = (value==null)? "This field is required" : "";
    
        this.setState(prevState=>{
            return({
                errors,
            details: {
                ...prevState.details,
                ["sectorName"]: value?.name
            }
        }
            );
        })
        
    }

    handleChange = (e) =>{
        const {name, value} = e.target;
        let errors = this.state.errors;
        errors[name] = (value=="")? "This field is required" : "";

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
            axios.post('http://localhost:8080/companies', this.state.details)
              .then(response=> {
                this.setState({
             
                    details: {
                        name: "",
                        turnover: "",
                        ceo:"",
                        boardOfDirectors:"",
                        brief:"",
                        sectorName:""
        
                    },
                    errors:{
                        name: "",
                        turnover: "",
                        ceo:"",
                        boardOfDirectors:"",
                        brief:"",
                        sectorName:""
        
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
    
    render()
    {
        return(
            <div className = "container">
                <h1> Add a Company</h1>
                 
                <form  autoComplete="off" onSubmit = {this.handleSubmit}>
                    {
                        textFieldNames.map((tfn,id) => (
                            <TextField 
                        required
                        id={tfn}
                        name={tfn}
                        label={textFieldLabels[id]}
                        fullWidth
                        placeholder ={`Enter ` + textFieldLabels[id] + ` of Company`}
                        value = {this.state.details[tfn]}
                        onChange = {this.handleChange}
                        error = {this.state.errors[tfn]!=""}
                        helperText = {this.state.errors[tfn]} 
                         />
                        ))
                    }
                    <SelectSector handleSelectChange={this.handleSelectChange.bind(this)} selectError = {this.state.errors.sectorName} />
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
               this.state.globalError == "" ? "Added successfully" : this.state.globalError
           }
        </MuiAlert>
      </Snackbar>
            </div>
        );
    }
}