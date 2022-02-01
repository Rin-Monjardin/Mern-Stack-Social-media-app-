import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 0,
    marginBottom : '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px  10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    marginRight : '7px',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    padding : '0px 10px'
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginRight : '20px'
  },
  dropDown : {
    width: '200px',
    position : 'absolute',
    top : '60px',
    right : '1px',
    background: 'rgb(255, 255, 255)',
    borderRadius : '0px',
    textAlign : 'right',
    zIndex : '2',
  },
  hover : {
    '&:hover' : {
      color : 'white'
    }
  },
  logoutContainer : {
    padding : '3px',
    display: 'flex',
    '&:hover': {
      background: "rgba(5, 70, 255, 0.76)",
      color : 'white'
    },
  },
  addIcon : {
    marginRight : '10px',
    height : '30px',
    width : '30px'
  }
}));