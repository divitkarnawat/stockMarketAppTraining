import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const linkLabels = ["Import Excel","Company","Sector","Stock Exchange","IPO Details","Charts"];
const linkNames = ["import_excel","companies","sectors","stock_exchanges","ipo_details","charts"];

export default class NavBarLinks extends React.Component
{
    constructor(props)
    {
        super(props);

    }


    render()
    {
        return(
            <div className = "navbarLinksContainer">
            {
                linkLabels.map((linkLabel,id) =>
                {
                    return <Button                 
                    size ="large"
                     href = {`http://localhost:3000/`+linkNames[id]} > {linkLabel} </Button>
                })
            }
            </div>
        );
        
    }
}