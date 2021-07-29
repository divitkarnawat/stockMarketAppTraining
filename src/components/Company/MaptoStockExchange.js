import React from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SelectSector from '../SelectSector.js';

const axios = require('axios');


export default class MaptoStockExchange extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.state = {
            details: {
                companyName: "",
                stockExchangeName: "",
                companyCode: ""
            },
            errors:{
                stockExchangeName: "",
                companyCode: ""
            },
            globalError: "",
            open: false
        }
        this.dataStockExchange = []
    }


    componentDidMount()
    {
        let companyNameGet = "";
        
        axios.get(`https://stock-market-app-java-divitk.herokuapp.com/stock_exchanges`)
        .then(response =>
            {
                this.dataStockExchange = response.data;
            })
        .catch(error => console.log(error));

        axios.get(`https://stock-market-app-java-divitk.herokuapp.com/companies/id/` + this.props.id)
        .then(response =>
            {
                this.setState(prevState =>{
                    return({
                        details: {
                            ...prevState.details,
                            companyName: response.data.name
                        }
                    });
                })
            })
        .catch(error=> console.log(error));
       
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
            axios.post('https://stock-market-app-java-divitk.herokuapp.com/mapCompStock', this.state.details)
              .then(response=> {
                this.setState(prevState => { return ({
             
                    details: {
                        ...prevState.details,
                        stockExchangeName: "",
                        companyCode: ""
                    },
                    errors:{
                        stockExchangeName: "",
                        companyCode: ""
                    },
                    globalError: "",
                    open: true
                
            });
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
                <h1> Add Company to Stock Exchange</h1>
                 
                <form  onSubmit = {this.handleSubmit}>

                <TextField
                required
                id="companyName"
                name="companyName"
                label="Company"
                fullWidth
                disabled
                value = {this.state.details.companyName}
                
                 />

                <Autocomplete
                    id="combo-box-demo"
                    options={this.dataStockExchange}
                    getOptionLabel={(option) => option?.name}
                    onChange={(e,val)=>this.handleChange("stockExchangeName", val?.name)}
                    renderInput={(params) => <TextField {...params} label="Stock Exchange" fullWidth required  />}
                    />

                <TextField
                required
                id="companyCode"
                name="companyCode"
                label="Company Code"
                fullWidth
                value = {this.state.details.companyCode}
                onChange={(e)=>this.handleChange(e.target.name, e.target.value)}
                error = {this.state.errors.companyCode!=""}
                helperText = {this.state.errors.companyCode} 
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
               this.state.globalError == "" ? "Company added to Stock Exchange" : this.state.globalError
           }
        </MuiAlert>
      </Snackbar>
            </div>
        );
    }
}