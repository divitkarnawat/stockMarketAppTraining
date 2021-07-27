import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ShowUserDetails from '../../components/AppUser/ShowUserDetails.js';
import UpdateUser from '../../components/AppUser/UpdateUser.js';

export default class UserPage extends React.Component
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
            case 0: return <ShowUserDetails id={localStorage.getItem('userId')}/>
            break;
            // case 1: return <UpdateUser />
            // break;
           
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
                    <Tab label="User Details" />
                    {/* <Tab label="Update User" /> */}
                    
              
                    
                </Tabs>
                </Paper>
              

{
    this.renderComponent(this.state.compId)
}
</div>
        );
    }
}