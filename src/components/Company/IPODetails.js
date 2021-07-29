import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AddIPO from '../IPO/AddIPO.js';
import UpdateIPO from '../IPO/UpdateIPO.js';
import ShowIPODetails from '../IPO/ShowIPODetails.js';
import AddIPOtoStockExchange from '../IPO/AddIPOtoStockExchange.js';


const axios = require('axios');

export default class IPODetails extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state ={
            compId: 0,
            status: false,
            IPO_ID: null
        }
        
    }


    renderComponent = (compId) =>
    {
        switch(compId)
        {
            case 0: return <AddIPO  handleIPOStatus = {this.handleIPOStatus.bind(this)}  company_id = {this.props.id} />
            break;
            case 1: return <ShowIPODetails id={this.state.IPO_ID}/>
            break;
            case 2: return <AddIPOtoStockExchange id={this.state.IPO_ID}/>
            break;
            case 3: return <UpdateIPO id={this.state.IPO_ID} />
            break; 
        }
    }
    componentDidMount()
    {
        
        axios.get(`http://localhost:8080/companies/` + this.props.id + `/isIPOAdded`)
        .then(response=>
            {
                let compId = 0;
                if(response.data[0])
                {
                    compId = 1;
                }
                this.setState(
                    {
                        compId: compId,
                        status: response.data[0] == 1 ? true : false,
                        IPO_ID: response.data[1]

                    }
                )
            })
            .catch(error => console.log(error));
    }

    handleCompId = (event, newVal) =>
    {
        this.setState({
            compId: newVal
        })
    }

    handleIPOStatus = (id) =>
    {
        this.setState(
            {
                compId: 1,
                status: true,
                IPO_ID: id
            }
        )
    }

    render()
    {
        return(
            <div className = "container">
                <Paper square>
                <Tabs
                    value={this.state.compId}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleCompId}
                    variant = "fullWidth"
                    
                >
                    <Tab label="Add IPO" disabled = {this.state.status  || localStorage.getItem('admin')=="false"}/>
                    <Tab label="Show IPO Details" disabled = {!this.state.status} />
                    <Tab label="Add IPO to Stock Exchange" disabled = {!this.state.status  || localStorage.getItem('admin')=="false"}/>
                    <Tab label="Update IPO Details" disabled = {!this.state.status  || localStorage.getItem('admin')=="false"}/>
                    
                </Tabs>
                </Paper>
            <div>
            {/* <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled = {this.state.status}
                        onClick = {()=>this.handleCompId(0)}
                    >
                        Add IPO
            </Button>
            <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled = {!this.state.status}
                        onClick = {()=>this.handleCompId(1)}
                    >
                        Show IPO Details
            </Button>
            <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled = {!this.state.status}
                        onClick = {()=>this.handleCompId(2)}
                    >
                        Add IPO to Stock Exchange
            </Button>
            <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled = {!this.state.status}
                        onClick = {()=>this.handleCompId(3)}
                    >
                        Update IPO Details
            </Button> */}
            </div>
            <hr />

            {
                this.renderComponent(this.state.compId)
            }
            </div>

        );
    }



}