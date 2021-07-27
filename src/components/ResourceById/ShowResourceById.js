import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from "@material-ui/core/styles";
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const axios = require('axios');

const headingNames = ["Company", "Sector", "Stock Exchange","User","Stock Price","IPO"]

const fieldNames=[
    ["Name","Turnover","Ceo","Board of directors","Brief","Sector name"],
    ["Name", "Brief"],
    ["Name","Brief","Contact address","Remarks"],
    ["Username","Password","Email","Admin","Role","Mobile Number"],
    []
]


export default class ShowResourceById extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            onLoad: false,
            res_id: 0,
            open: false
        }
        this.data = [];
        this.errorMessage = "";
    }


    componentDidMount()
    {
        const res_name = this.props.res_name;
        const id = this.props.id;
        // const linkAdd = 
        axios.get(`http://localhost:8080/` + res_name + `/id/` + id)
        .then(response => {
            this.data = Object.values(response.data);
            let res_id;
            switch(res_name)
            {
                case "companies": 
                    res_id = 0; 
                    break;
                case "sectors": 
                    res_id = 1; 
                    break;
                case "stock_exchanges": 
                    res_id = 2; 
                    break;
                case "users": 
                    res_id = 3; 
                    break;
                case "stock_prices": 
                    res_id = 4; 
                    break;
                default:
                    res_id = 0;
                    break; 
            }
            this.setState({
                onLoad: true,
                res_id: res_id
            })
            }).catch(error =>
                {
                    this.errorMessage = error.response.data.details[0];
                    this.setState({
                        open: true,
                        onLoad: false
                    })
                    setTimeout(()=>this.props.history.push(`/` + res_name), 3000);
                    
                }
            );
    }

    render()
    {
        if(!this.state.onLoad)
        return(
            <Snackbar open={this.state.open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert variant = 'filled' severity="error" >
                    <div style={{display: 'flex',flexDirection: 'column', alignItems:'center', fontSize: '18px'}}>
                    <div>
                    {
                        this.errorMessage
                    }
                    </div>
                    <div>
                    Redirecting...
                    </div>
                    </div>
                </MuiAlert>
            </Snackbar>
            
        );
        let res_id = this.state.res_id;
        return(
            <div className = "container">
                <h1> {headingNames[res_id]} Details</h1>
                <Grid container>
                    <Grid item xs={12}>
                    <TableContainer component={Paper} >
                    <Table>
                    <TableBody>
                        {  
                        fieldNames[res_id].map((row,id) => (
                            <TableRow> <TableCell>{row} </TableCell> <TableCell>{this.data[id+1]?.toString()}</TableCell> </TableRow>
                        )
                        )
                    }
                    </TableBody>
                    </Table>
                    </TableContainer>
                    </Grid>
                    
                </Grid>
            </div>
        );
    }
}