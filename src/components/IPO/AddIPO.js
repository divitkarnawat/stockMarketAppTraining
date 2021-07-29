import React from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const axios = require('axios');

const textFieldLabels = ["Price per Share","Total Number of Shares","Remarks"];
const textFieldNames = ["pricePerShare","totalNumberOfShares","remarks"];

export default class AddIPO extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            details: {
                pricePerShare: "",
                totalNumberOfShares: "",
                remarks:"",
                openDateTime: (new Date()).toISOString()
            },
            errors:{
                pricePerShare: "",
                totalNumberOfShares: "",
                openDateTime:"",
                remarks:""
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

    
    handleChange = (name, value) =>{
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
            axios.post(`https://stock-market-app-java-divitk.herokuapp.com/companies/` + this.props.company_id + `/ipo`, this.state.details)
              .then(response=> {
                this.setState({
             
                    details: {
                        pricePerShare: "",
                        totalNumberOfShares: "",
                        remarks:"",
                        openDateTime:""
                    },
                    errors:{
                        pricePerShare: "",
                        totalNumberOfShares: "",
                        openDateTime:"",
                        remarks:""
                    },
                    globalError: "",
                    open: true
                
            })
            this.props.handleIPOStatus(response.data.id);
                  
              })
              .catch((error)=> {
                this.setState({
                    globalError: error.response.data.details[0],
                    open: true
                })
              });
        }
    }

    handleDateChange = (date) => {
        this.setState(prevState=>{
            return({
            details: {
                ...prevState.details,
                openDateTime: date.toISOString()
            }
        }
            );
        })
        
        
      };
    
    
    render()
    {
        return(
            <div className = "container">
                <h1> Add IPO</h1>
                 
                <form  autoComplete="off" onSubmit = {this.handleSubmit}>
                    {
                        textFieldNames.map((tfn,id) => (
                            <TextField 
                        required
                        id={tfn}
                        name={tfn}
                        label={textFieldLabels[id]}
                        fullWidth
                        placeholder ={`Enter ` + textFieldLabels[id] + ` of IPO`}
                        value = {this.state.details[tfn]}
                        onChange = {(e) => this.handleChange(e.target.name, e.target.value)}
                        error = {this.state.errors[tfn]!=""}
                        helperText = {this.state.errors[tfn]} 
                         />
                        ))
                    }
                    
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      
       
        <KeyboardDatePicker
          margin="normal"
          id="Open Date"
          label="Open Date"
          format="MM/dd/yyyy"
          value={this.state.details.openDateTime}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Open Time"
          value={this.state.details.openDateTime}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      
    </MuiPickersUtilsProvider>
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