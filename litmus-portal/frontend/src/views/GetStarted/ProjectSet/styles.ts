import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  rootDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rootLitmusText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& img': {
      marginBottom: theme.spacing(1.5),
    },
  },
  HeaderText: {
    maxWidth: '23.56rem',
    fontWeight: 500,
    fontSize: '2rem',
    color: theme.palette.text.secondary,
  },
  litmusText: {
    marginTop: theme.spacing(1.875),
    maxWidth: '23.56rem',
    fontWeight: 400,
    fontSize: '1rem',
    color: theme.palette.text.secondary,
  },
  inputDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(7.5),
  },
  inputValue: {
    margin: theme.spacing(1.875, 0, 1.875, 0),
    '& .MuiFormHelperText-root': {
      background: theme.palette.primary.main,
      marginTop: 0,
    },
    '& .MuiFormHelperText-contained': {
      margin: 0,
    },
  },
  submitButton: {
    padding: theme.spacing(1.25, 4),
    background: theme.palette.primary.light,
    color: theme.palette.text.secondary,
    '&:disabled': {
      PointerEvents: 'none',
      background: theme.palette.primary.light,
      color: theme.palette.text.secondary,
    },
    '&:hover': {
      background: theme.palette.primary.light,
    },
  },
  buttonGroup: {
    marginTop: theme.spacing(3.75),
    width: '100%',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  step: {
    marginTop: theme.spacing(1.875),
  },
}));
export default useStyles;
