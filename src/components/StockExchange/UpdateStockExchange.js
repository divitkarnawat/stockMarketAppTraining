import React from 'react';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const axios = require('axios')

const textFieldLabels = ["Name","Brief","Contact address","Remarks"];
const textFieldNames = ["name","brief","contactAddress", "remarks"];
const textFieldRequired = [true, false, false, false];

export default class UpdateStockExchange extends React.Component{
    
    constructor()
    {
        super();
        this.state = {
            details: {
                name: "",
                brief: "",
                contactAddress:"",
                remarks:""
            },
            errors:{
                name: null
            },
            globalError: "",
            open: false
        }
    }
    componentDidMount()
    {
        axios.get('http://localhost:8080/stock_exchanges/id/' + this.props.id)
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

    // resetForm = () =>{
    //     this.setState({
             
    //             details: {
    //                 name: "",
    //                 brief: ""
    //             },
    //             errors:{
    //                 name:"",
    //                 brief:""
    //             },
    //             globalError: ""
            
    //     })
    // }
    handleSubmit = (e) =>{
        e.preventDefault();
        if(!this.checkErrors())
        {
            let sendData = this.state.details;
            sendData.id = this.props.id;
            axios.put(`http://localhost:8080/stock_exchanges/update/` + this.props.id, sendData)
              .then(response=> {
                this.setState({
                    details: {
                        name: "",
                        brief: "",
                        contactAddress:"",
                        remarks:""
                    },
                    errors:{
                        name: null
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
                errors.name = (value== "") ? "This field is required" : null;
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
        return !(Object.values(this.state.errors).every(val=>val==null));
    }

    render()
    {
        return(
            <div className = "container">
                <h1> Update Stock Exchange</h1>
                 
                <form  autoComplete="off" onSubmit = {this.handleSubmit}>    
                {
                        textFieldNames.map((tfn,id) => (
                            <TextField 
                        required={textFieldRequired[id]}
                        id={tfn}
                        name={tfn}
                        label={textFieldLabels[id]}
                        fullWidth
                        placeholder ={`Enter ` + textFieldLabels[id] + ` of Stock Exchange`}
                        value = {this.state.details[tfn]}
                        onChange = {this.handleChange}
                        error = {this.state.errors[tfn]!=null}
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