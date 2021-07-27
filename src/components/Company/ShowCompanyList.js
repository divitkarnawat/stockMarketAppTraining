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
import TextField from '@material-ui/core/TextField';

const axios = require('axios');

const tableHeadings = ["Name","Turnover","Sector name"];
const dataCells = ["name","turnover","sectorName"];

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


 
export default class ShowCompanyList extends React.Component{
    constructor(props)
    {
        super(props);
        this.originalData = [];
        this.data = [];
        this.state = {
            onLoad: false,
            searchedValue: ""
        }
    }

    handleClick = (id) =>
    {
      this.props.openCompany(id);
    }

    handleSearchChange = (e) =>
    {
      const filteredRows = this.originalData.filter(row => {
        return row.name.toLowerCase().includes(e.target.value.toLowerCase());
      })
      this.data = filteredRows;
      this.setState(
        {
          searchedValue: e.target.value
        }
      )
    }

    componentDidMount()
    {
        axios.get('http://localhost:8080/companies')
        .then(response => {
            this.data = response.data;
            this.originalData = response.data;
            this.setState({onLoad: true});
        }
        ).catch(error => console.log(error)); 
    }

    render()
    {
        return(
            <div className = "container">
              <h1> List of Companies</h1>
              <TextField 
              onChange = {this.handleSearchChange}
              placeholder = "Search company"
              />
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

