import React, { Component } from 'react';
// Import fusioncharts.js files from fusioncharts module
import FusionCharts from 'fusioncharts';
// Import the timeseries file from fusioncharts module
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
// Import ReactFusioncharts from react-fusioncharts module
// import ReactFC from 'react-fusioncharts';
import ReactFC from 'react-fusioncharts';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';

// Add core FusionCharts module and TimeSeries module as dependecies in react-fusioncharts
ReactFC.fcRoot(FusionCharts, TimeSeries);



class SimpleTimeseries extends Component {
  constructor(props) {
    super(props);
    
    this.state = {

     
      details:
      {
        companyName: "",
        stockExchangeName: "",
        fromDateTime: (new Date()).toISOString(),
        toDateTime: (new Date()).toISOString()
      },
      selectDataLoad: false,
      showChart: false,

      // Here timeseriesDs is the configuration object which we will pass as a prop to our ReactFC component.
      timeseriesDs: {
        type: 'timeseries',
        renderAt: 'container',
        width: '80%',
        height: '400',
        dataSource: {
          caption: { text: 'Stock Price Chart' },
          // Initially data is set as null
          data: null,
          yAxis: [
            {
              plot: [
                {
                  value: 'Sales ($)'
                }
              ]
            }
          ]
        }
      }
    };

    this.stockExchangeList = [];
    this.companyList = [];

    // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
    // parameters, one is data another is schema. Check the method definition to get more info.
    this.createDataTable = this.createDataTable.bind(this);
  }

  createDataTable() {
   


    // stockPriceList.map(stockPrice =>
    //   {
    //     let dataValue = [];
    //     dataValue.push(stockPrice.date);
    //     dataValue.push(stockPrice.currentPrice);
        
    //     data.push(dataValue);
        
    //   })
    
//        data =[ ["2019-06-08", 358.12]
//  ["2019-06-08", 357.09]
//  ["2019-06-08", 353.62]
//  ["2019-06-08", 349.56]
//  ["2019-06-08", 351.43]
//  ["2019-06-08", 350.12]
//   ];
      const data = [
        [
            "1/4/2011",
            16.448
        ],
        [
            "1/5/2011",
            10
        ],
        [
            "1/5/2011",
            20
        ],
        [
            "1/5/2011",
            30
        ],
        [
            "1/6/2011",
            19.536
        ],
        [
            "1/7/2011",
            2573.82
        ],
    ]
      const schema = [{
        "name": "Time",
        "type": "date",
        "format": "%d/%m/%y"
    }, {
        "name": "Sales",
        "type": "number"
    }];
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // After that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
      timeseriesDs.dataSource.data = fusionTable;
      this.setState({
        showChart: true,
        timeseriesDs
      });
  
  }

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

  handleSubmit = (e) =>
  {
    e.preventDefault();
    // axios.post(`https://stock-market-app-java-divitk.herokuapp.com/stock_prices/getStockPriceForCompanyChart`, this.state.details)
    // .then(response =>
    //   {
    //     this.createDataTable(response.data);
    //   })
    //   .catch(error => console.log(error));

      this.createDataTable();
  }

  render() {

    return (
      <div className="container">

{/* <form onSubmit={this.handleSubmit}> 
            <Autocomplete
            id="companySelect"
            options={this.companyList}
            getOptionLabel={(option) => option?.name}
            onChange={(e,val)=>this.handleSelectChange("companyName", val?.name)}
            renderInput={(params) => <TextField {...params} label="Company" fullWidth required  />}
            />

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
          format="yyyy/mm/dd"
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
          format="yyyy/mm/dd"
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
                   */}

{
 <ReactFC {...this.state.timeseriesDs} />
}
       
      </div>
    );
  }
}

export default SimpleTimeseries;
