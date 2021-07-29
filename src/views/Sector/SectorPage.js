import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Container from '@material-ui/core/Container';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';


import ShowSectorList from '../../components/Sector/ShowSectorList.js';
import AddSector from '../../components/Sector/AddSector.js';
import UpdateSector from '../../components/Sector/UpdateSector.js';
import ShowResourceById from '../../components/ResourceById/ShowResourceById.js';
import ShowCompaniesInSector from '../../components/Sector/ShowCompaniesInSector.js';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

  export default function SectorPage() {
    const classes = useStyles();
    
    const [open, setOpen] = React.useState(true);
    const [id,setId] = React.useState(null);
    const [compId, setCompId] = React.useState(0);

    const renderComponent = (compId) =>
    {
        switch(compId)
        {
            case 0: return <ShowSectorList openSector = {openSector}/>
            break;
            case 1: return <AddSector />
            break;
            case 2: return <ShowResourceById res_name = "sectors" id={id}/>
            break;
            case 3: return <UpdateSector id={id} />
            break;
            case 4: return <ShowCompaniesInSector id ={id}/>
            break;
     
        }
    }

    const handleCompId = (comp_id) =>
    {
        setCompId(comp_id);
        if(comp_id == 0 || comp_id ==1)
        {
            setId(null);
        }
        
    }

    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const openSector = (sector_id) =>
    {
        
        setId(sector_id);
        setCompId(2);
        
    }
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar  className={`dashboardAppBar ` + clsx(classes.appBar, open && classes.appBarShift)} position="absolute">
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Sector
            </Typography>
           
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
                <ListItem button onClick = {()=>handleCompId(0)} selected = {compId == 0}>
                    <ListItemIcon>
                    <DashboardIcon />
                    </ListItemIcon>
                <ListItemText primary="Sector List" />
                </ListItem>

                {localStorage.getItem('admin')=="true" ? 
                <ListItem button onClick = {()=>handleCompId(1)}  selected = {compId == 1}>
                    <ListItemIcon>
                    <DashboardIcon />
                    </ListItemIcon>
                <ListItemText primary="Add Sector" />
                </ListItem>
                : ""}

                <ListItem button onClick = {()=>handleCompId(2)} disabled={id==null } selected = {compId == 2}>
                    <ListItemIcon>
                    <DashboardIcon />
                    </ListItemIcon>
                <ListItemText primary="Sector Details"  />
                </ListItem>

                {localStorage.getItem('admin')=="true" ? 
                <ListItem button onClick = {()=>handleCompId(3)} disabled={id==null} selected = {compId == 3}>
                    <ListItemIcon>
                    <DashboardIcon />
                    </ListItemIcon>
                <ListItemText primary="Update Sector" />
                </ListItem>
                : ""}
                
                <ListItem button onClick = {()=>handleCompId(4)} disabled={id==null} selected = {compId == 4}>
                    <ListItemIcon>
                    <DashboardIcon />
                    </ListItemIcon>
                <ListItemText primary="Companies in Sector" />
                </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />





        <Container maxWidth="lg" className={classes.container}>
            {
            renderComponent(compId)
            }
            </Container>
      </main>
    </div>
  );
}