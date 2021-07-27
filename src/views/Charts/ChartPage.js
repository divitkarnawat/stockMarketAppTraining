import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import ShowChartCompany from './ShowChartCompany.js';
import ShowChartSector from './ShowChartSector.js';
import ShowChartCompanySector from './ShowChartCompanySector.js';

export default class ChartPage extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            compId: 0
        }
    }

    renderComponent = (compId) =>
    {
        switch(compId)
        {
            case 0: return <ShowChartCompany />
            break;
            case 1: return <ShowChartSector />
            break;
            case 2: return <ShowChartCompanySector/>
            break;
        }
    }

    handleCompId = (event, newVal) =>
    {
        this.setState({
            compId: newVal
        })
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
                    <Tab label="Company Chart" />
                    <Tab label="Sector Chart" />
                    <Tab label="Company-Sector Chart" />
              
                    
                </Tabs>
                </Paper>
              

{
    this.renderComponent(this.state.compId)
}
</div>
        );
    }
}