import React from 'react';
import Button from '@material-ui/core/Button';

import "./HomePage.css";

export default class HomePage extends React.Component{

    render()
    {
        return (

            <div className = "homepage homepage_">
                <h1>Stock Market Charting Application</h1>
                <div className = "homepage-main">
                <h2> Getting Started</h2>
                <div className = "homepage-btns">
                <Button variant="contained" color="primary" href="https://stock-market-application-divit.herokuapp.com/user/signin">
                    SignIn
                </Button>
                <Button variant="contained" color="primary" href="https://stock-market-application-divit.herokuapp.com/user/signup">
                    SignUp
                </Button>
                </div>
                </div>
            </div>
        );
    }
}