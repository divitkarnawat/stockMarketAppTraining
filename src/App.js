import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import HomePage from "./views/homePage/HomePage.js";
import AddSector from "./components/Sector/AddSector.js";
import AddCompany from "./components/Company/AddCompany.js";
import AddStockExchange from "./components/StockExchange/AddStockExchange.js";
import ShowSectorList from "./components/Sector/ShowSectorList.js";
import ShowCompanyList from "./components/Company/ShowCompanyList.js";
import ShowStockExchangeList from "./components/StockExchange/ShowStockExchangeList.js";
import ShowAppUserList from "./components/AppUser/ShowAppUserList.js";
import ShowResourceById from "./components/ResourceById/ShowResourceById.js";
import CompanyPage from './views/Company/CompanyPage.js';
import IPOPage from './views/IPO/IPOPage.js';
import SectorPage from './views/Sector/SectorPage.js';
import StockExchangePage from './views/StockExchange/StockExchangePage.js';
import MaterialUIPickers from './components/testmain.js';
import './App.css';
import UploadStockPrice from './views/UploadStockPrice/UploadStockPrice.js';
import Navbar from './components/Navbar/Navbar.js';
import ChartPage from './views/Charts/ChartPage.js';
import SignUpPage from './views/signupPage/SignUpPage.js';
import SignInPage from './views/signinPage/SignInPage.js';
import ConfirmUserPage from './views/ConfirmUserPage.js';
import UserPage from './views/userPage/UserPage.js';


export default class App extends React.Component {
  

  render()
  {
  return(
    <> 
    
    <Router>
      <Switch>
      
      <Route exact path = "/"> <HomePage /> </Route>
      <Route path = "/user/signup"  component={SignUpPage}/>
      <Route path = "/user/signin"  component={SignInPage}/>
      <Route path = "/confirmuser/:userId"  component={ConfirmUserPage}/>
      </Switch>
      </Router>

      
      <Router>
      {
        localStorage.getItem('token') != "" ? <Navbar /> : <></>
      }
        <Switch>
      
      
      <Route path = "/user_details" component = { UserPage} /> 
      <Route path = "/:res_name/id/:id" component = {ShowResourceById} /> 
      
      
        <Route path = "/sectors" component = {SectorPage} /> 

      <Route path = "/stock_exchanges" component = {StockExchangePage} /> 
      
      <Route path = "/users" component = {ShowAppUserList} /> 
      <Route path = "/test"> <MaterialUIPickers /> </Route>
      <Route path = "/charts"  component={ChartPage}/>
      <Route path = "/companies" component = {CompanyPage} /> 
      <Route path = "/ipo_details" component = {IPOPage} /> 
      <Route path = "/import_excel"> <UploadStockPrice /> </Route>
   
      

      </Switch>
    </Router>
    </>
  );
  }
}
