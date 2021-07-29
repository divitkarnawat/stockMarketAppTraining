
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


const rowLabels = ["Price per Share","Total Number of Shares"];
const rowNames = ["pricePerShare","totalNumberOfShares"];

export default class ShowIPODetails extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            load: false,
            ipoDetails: {}
        }
        
    }

    

    componentDidMount()
    {
        axios.get(`https://stock-market-app-java-divitk.herokuapp.com/ipo_details/` + this.props.id )
        .then(response =>
            {
                let listStockExchanges = [];
                axios.get(`https://stock-market-app-java-divitk.herokuapp.com/ipo_details/` + this.props.id + `/stock_exchanges`)
                .then(response1 => {
                    console.log(response1.data);
                    
                    this.setState({
                        ipoDetails: {...response.data, stockExchanges: response1.data}
                    })
                })
                .catch(error => console.log(error));

                
               
                
            })
            .catch(error=> console.log(error));

        
    }


    render()
    {
        return(
            <div className = "container">
                <TableContainer component={Paper} >
                    <Table>
                    <TableBody>
                    <TableRow>
                        <TableCell>Company</TableCell>
                        <TableCell>{this.state.ipoDetails.company?.name}</TableCell>
                    </TableRow>
                        {  
                        rowNames.map((rowName,id) => (
                            <TableRow> <TableCell>{rowLabels[id]} </TableCell> <TableCell>{this.state.ipoDetails[rowName]}</TableCell> </TableRow>
                        )
                        )
                    }
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>{this.state.ipoDetails["openDateTime"]?.split("T")[0]}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>{this.state.ipoDetails["openDateTime"]?.split("T")[1]}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Listed in Stock Exchanges</TableCell>
                        <TableCell>{this.state.ipoDetails["stockExchanges"]?.join(", ")}</TableCell>
                    </TableRow>
                    </TableBody>
                    </Table>
                    </TableContainer>
            </div>
        );
    }
}