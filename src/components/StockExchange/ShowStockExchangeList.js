import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from "@material-ui/core/styles";
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const axios = require('axios');

const tableHeadings =["Name","Brief","Contact Address"];
const dataCells = ["name","brief","contactAddress"];

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      transition: 'box-shadow .6s',
      '&:hover':{
          boxShadow: '0px 1px 10px black'
      }
    },
  }))(TableRow);

export default class ShowStockExchangeList extends React.Component{
    constructor(props)
    {
        super(props);
        this.data = [];
        this.state = {
            onLoad: false
        }
    }

    componentDidMount()
    {
        axios.get('https://stock-market-app-java-divitk.herokuapp.com/stock_exchanges')
        .then(response => {
            this.data = response.data;
            this.setState({onLoad: true});
        }
        ).catch(error => this.props.history.push("/stock_exchanges")); 
    }

    handleClick = (id) =>
    {
      this.props.openStockExchange(id);
    }

    render()
    {
        return(
            <div className = "container">
              
            <TableContainer component={Paper} >
            <Table stickyHeader className = "displayTable">
              <TableHead>
                <TableRow>
                  {tableHeadings.map(heading => (<StyledTableCell>{heading}</StyledTableCell>))}
                  <StyledTableCell width = "10%" align = "right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
            {this.data.map((row) => (
                <StyledTableRow key={row.id}>
                  {dataCells.map(cellData => ( <StyledTableCell> {row[cellData]} </StyledTableCell>))}
                <StyledTableCell align = "right" >
                <Button
                        variant="contained"
                        color="primary"
                        onClick = {()=>this.handleClick(row.id)}                     
                        endIcon={<SendIcon />}
                    >
                        Open
                    </Button>
                </StyledTableCell>
                </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
        
        );
    }
}