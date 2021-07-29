/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const axios = require('axios');

const filter = createFilterOptions();

export default function SelectSector(props){

  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [load,setLoad] = React.useState(false);

  const handleClose = () => {
    toggleOpen(false);
  };


  React.useEffect(() => {
    axios.get('https://stock-market-app-java-divitk.herokuapp.com/sectors').then(response => {
        sectorList = response.data;
        setLoad(true);
    }).catch(error => console.log(error));
  });

if(!load)
{
    return(<> </>);
}

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {

          if (typeof newValue === 'string') {
            setTimeout(() => {
              toggleOpen(true);
              
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
           
          } else {
            props.handleSelectChange(newValue);
            setValue(newValue);
            
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }
          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={sectorList}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.name}
        freeSolo
        renderInput={(params) => (
          <TextField fullWidth {...params} label="Select Sector" required error = {props.selectError!=""} helperText = {props.selectError} />
        )}
      />
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add a new sector</DialogTitle>
      <DialogContent>
            <DialogContentText>
              This sector does not exist. Kindly add the sector 
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" href="https://stock-market-application-divit.herokuapp.com/sectors/add">
              Add
            </Button>
          </DialogActions>

      </Dialog>
    </React.Fragment>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
let sectorList = [
];
