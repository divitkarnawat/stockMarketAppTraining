
import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from "@material-ui/core/styles";
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const axios = require('axios');


const rowLabels = ["Username","Email","Role","Mobile Number"];
const rowNames = ["name","email","role","mobileNumber"];

export default class ShowUserDetails extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            load: false,
            userDetails: {}
        }
        
    }

    

    componentDidMount()
    {
        axios.get(`http://localhost:8080/user_details/` + this.props.id)
        .then(response =>
            {
                
                console.log(response.data);
                this.setState(
                    {
                        load: true,
                        userDetails: response.data
                    }
                )
                })
                .catch(error => console.log(error));

            

        
    }


    render()
    {
        return(
            <div className = "container">
                <h1>User Details</h1>
                <TableContainer component={Paper} >
                    <Table>
                    <TableBody>
                  
                        {  
                        rowNames.map((rowName,id) => (
                            <TableRow> <TableCell>{rowLabels[id]} </TableCell> <TableCell>{this.state.userDetails[rowName]}</TableCell> </TableRow>
                        )
                        )
                    }
                    
                    </TableBody>
                    </Table>
                    </TableContainer>
            </div>
        );
    }
}