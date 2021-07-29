import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const axios = require('axios');

export default class ConfirmUserPage extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        axios.get(`https://stock-market-app-java-divitk.herokuapp.com/confirmUser/` + this.props.match.params.userId)
        .then(response => {
            setTimeout(()=> this.props.history.push('/user/signin'), 3000);
        })
        .catch(error=>console.log(error));
    }

    render()
    {
        return(
            <div className = "homepage homepage_">
            <CircularProgress /> 
            Confirming...   You will be redirected to sign in page
            </div>
        );
    }
}


