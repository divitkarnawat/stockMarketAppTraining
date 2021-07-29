import React, { Component } from 'react';
// Import fusioncharts.js files from fusioncharts module
import FusionCharts from 'fusioncharts';
// Import the timeseries file from fusioncharts module
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
// Import ReactFusioncharts from react-fusioncharts module
// import ReactFC from 'react-fusioncharts';
import ReactFC from 'react-fusioncharts';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import XLSX from "xlsx";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';

import Chip from '@material-ui/core/Chip';


// Add core FusionCharts module and TimeSeries module as dependecies in react-fusioncharts
ReactFC.fcRoot(FusionCharts, TimeSeries);


const axios = require('axios');

class ShowChartCompany extends Component {
  constructor(props) {
    super(props);
    this.newData = [];
    this.state = {
        companyName: [],
        details:
      {
        
        stockExchangeName: "",
        fromDateTime: (new Date()).toISOString(),
        toDateTime: (new Date()).toISOString()
      },
      selectDataLoad: false,
        showChart: false,
        updateChart: true,
      // Here timeseriesDs is the configuration object which we will pass as a prop to our ReactFC component.
      timeseriesDs: {
        type: 'timeseries',
        renderAt: 'container',
        width: '100%',
        height: '600',
        dataSource: {
          caption: {
            text: 'Stock Price Chart'
          },
          series: 'Type',
          yAxis: [
            {
                plot: [
                    {
                      value: "Share Price",
                    //   connectnulldata: true
                    }
                  ],
              title: 'Share Price',
              format: {
                prefix: 'Rs. '
              }
            }
          ],
          // Initially data is set as null
          data: null
        }
      }
    };
    this.stockExchangeList = [];
    this.companyList = [];

    // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
    // parameters, one is data another is schema. Check the method definition to get more info.
    this.createDataTable = this.createDataTable.bind(this);
  }

  exportFile = ()=> {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(this.newData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "Stock_Price_Data.xlsx");
  }
  createDataTable(responses) {
      
    this.newData = [];
    responses.map((response,id)=>
    {
        response.data.map(stp => {
            this.newData.push([stp.date, this.state.companyName[id], stp.currentPrice]);
        })
    })
    // newData = listvar.map(abc => {
    //       return [abc.date, "C-10",abc.currentPrice];
    //   })
      


      if(this.newData.length == 0)
      {
          this.setState({
              showChart : false
          })
      }
      else
      {

      
      const schema = [
        {
          "name": "Time",
          "type": "date",
          "format": "%Y-%m-%d"
        },
        {
          "name": "Type",
          "type": "string"
        },
        {
          "name": "Share Price",
          "type": "number"
        }
      ];
      // First we are creating a DataStore
      let fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      let fusionTable = fusionDataStore.createDataTable(this.newData, schema);
      
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      let timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;

      this.setState(prevState => {
          return({
        timeseriesDs,
        updateChart: !prevState.updateChart,
        showChart: true
      })});
    }
  }

  handleSubmit = (e)=>{
      e.preventDefault();
      
      let sendDetails = {...this.state.details, companyName: ""};
      let req = [];
      this.state.companyName.map(cname => {
          req.push( axios.post(`https://stock-market-app-java-divitk.herokuapp.com/stock_prices/getStockPriceForCompanyChart`, {...this.state.details, companyName: cname}));
      });

      axios.all(req).then(axios.spread((...responses) => {
          this.createDataTable(responses);
    }))
    .catch((error) => console.log(error));
      
      
      
    //   axios.post(`https://stock-market-app-java-divitk.herokuapp.com/stock_prices/getStockPriceForCompanyChart`, this.state.details)
    // .then(response =>
    //   {
    //     this.createDataTable(response.data);
    //   })
    //   .catch(error => console.log(error));

    
  }

  handleSelectChange = (name, value) =>
  {
    this.setState(prevState => {
      return(
        {
          details:{
            ...prevState.details,
            [name]: value
          }
        }
      )
    })
  }

  handleMultiSelectChange = (name, value) =>
  {
    this.setState(prevState => {
      return(
        {
          [name]: value
        }
      )
    })
  }






  handleFromDateChange = (date) => {
    this.setState(prevState=>{
        return({
        details: {
            ...prevState.details,
            fromDateTime: date.toISOString()
        }
    }
        );
    })
    
    
  };
  handleToDateChange = (date) => {
    this.setState(prevState=>{
        return({
        details: {
            ...prevState.details,
            toDateTime: date.toISOString()
        }
    }
        );
    })
    
    
  };

  // We are creating the DataTable immidietly after the component is mounted
  componentDidMount() {

    
  const requestOne = axios.get(`https://stock-market-app-java-divitk.herokuapp.com/companies`);
  const requestTwo = axios.get(`https://stock-market-app-java-divitk.herokuapp.com/stock_exchanges`);


  axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
    this.companyList = responses[0].data;
    this.stockExchangeList = responses[1].data;
    
    this.setState({
      selectDataLoad: true
    })
    // use/access the results 
  })).catch(errors => {
    // react on errors.
  })

   
  }

  render() {
    return (
      
              <div className="container" style={{marginTop: `20px`}}>

 <form onSubmit={this.handleSubmit}> 
 <FormControl style = {{display: `flex`}}>
        <InputLabel id="companyName">Company</InputLabel>
        <Select
        fullWidth
        required
          labelId="companyName"
          id="companyName"
          multiple
          value={this.state.companyName}
          onChange={(e) => this.handleMultiSelectChange("companyName",e.target.value)}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div >
              {selected.map((value) => (
                <Chip key={value} label={value}  />
              ))}
            </div>
          )}

        >
          {this.companyList.map((company) => (
            <MenuItem key={company.id} value={company?.name} >
              {company?.name}
            </MenuItem>
          ))}
        </Select>
        
      </FormControl>

            <Autocomplete
            id="stockExchangeSelect"
            options={this.stockExchangeList}
            getOptionLabel={(option) => option?.name}
            onChange={(e,val)=>this.handleSelectChange("stockExchangeName", val?.name)}
            renderInput={(params) => <TextField {...params} label="Stock Exchange" fullWidth required  />}
            />

<MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
          margin="normal"
          id="From Date"
          label="From Date"
          format="MM/dd/yyyy"
          value={this.state.details.fromDateTime}
          onChange={this.handleFromDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

          <KeyboardDatePicker
          margin="normal"
          id="To Date"
          label="To Date"
          format="MM/dd/yyyy"
          value={this.state.details.toDateTime}
          onChange={this.handleToDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>

        <Button
                        variant="contained"
                        color="primary"
                        className="submitBtn"
                        size="large"
                        type="submit"
                        endIcon={<SendIcon />}
                    >
                        Submit
                    </Button>
                    </form>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick = {this.exportFile}
                        style={{display: `flex`, margin: `20px auto`}}
                        disabled = {this.newData.length==0}
                        endIcon={<SendIcon />}
                    >
                        Export
                    </Button>
        {
            this.state.showChart? <ReactFC style={{marginTop: `20px`}} {...this.state.timeseriesDs} /> : ""}
            
            
      </div>
    );
  }
}

export default ShowChartCompany;
