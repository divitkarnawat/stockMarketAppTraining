import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';

import Chip from '@material-ui/core/Chip';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%'
    
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(10),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      
    },
  },
};


export default function AddIPOtoStockExchange(props) {
  const classes = useStyles();
  const [StockExchangeName, setStockExchangeName] = React.useState([]);
  const [open, setOpen]  = React.useState(false);
  const [globalError,setGlobalError] = React.useState("");
  const [stockExchanges, setStockExchanges] = React.useState([]);

  const handleChange = (event) => {
    setStockExchangeName(event.target.value);
  };


  React.useEffect(() =>
  {
      axios.get(`http://localhost:8080/stock_exchanges`)
      .then(response =>
        {
            setStockExchanges(response.data);
        })
        .catch(error => console.log(error));
  }
  )

  const handleSubmit = (e) =>
  {
      e.preventDefault();
      let sendData = {};
      sendData.stockExchangeList = StockExchangeName;

      axios.post(`http://localhost:8080/ipo_details/` + props.id + `/stock_exchanges`, sendData)
      .then(response =>
        {
            setGlobalError("");
            setOpen(true);   
        })
        .catch(error =>
            {
                setGlobalError(error.response.data.details[0]);
                setOpen(true);
            })
  }

  const handleClose = () =>
  {
      setOpen(false);
  }
  return (
    <div className = "container">
      <form  onSubmit = {handleSubmit}>
      <FormControl className={classes.formControl}>
        <InputLabel id="stockExchange">Stock Exchange</InputLabel>
        <Select
        fullWidth
        required
          labelId="stockExchange"
          id="stockExchange"
          multiple
          value={StockExchangeName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {stockExchanges.map((stockExchange) => (
            <MenuItem key={stockExchange.id} value={stockExchange.name} >
              {stockExchange.name}
            </MenuItem>
          ))}
        </Select>
        
      </FormControl>
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
      <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
                <MuiAlert variant = 'filled' onClose={handleClose} severity={globalError ? "error" : "success"}>
           {
               globalError == "" ? "Added successfully" : globalError
           }
        </MuiAlert>
      </Snackbar>
      
    </div>
  );
}
