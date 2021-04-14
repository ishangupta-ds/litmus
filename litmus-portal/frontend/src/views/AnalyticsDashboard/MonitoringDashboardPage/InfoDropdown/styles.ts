import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.disabledBackground,
    height: '3.25rem',
    paddingTop: theme.spacing(0.5),
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: '1rem',
    lineHeight: '140%',
    padding: theme.spacing(1.5, 0, 0, 3),
  },
  button: {
    background: 'none',
    boxShadow: 'none',
    '&:hover': {
      background: 'none',
      boxShadow: 'none',
      cursor: 'pointer !important',
    },
  },
  closeText: {
    fontSize: '0.75rem',
    lineHeight: '150%',
    color: theme.palette.text.hint,
  },
  closeIcon: {
    marginLeft: theme.spacing(1.5),
  },
  body: {
    display: 'flex',
    justifyContent: 'space-evenly',
    background: theme.palette.cards.header,
    padding: theme.spacing(0, 1),
  },
  infoSectionElement: {
    width: '33.33%',
    padding: theme.spacing(2, 2, 3, 2),
  },
  sectionHeader: {
    lineHeight: '130%',
    fontSize: '1rem',
    fontWeight: 500,
    padding: theme.spacing(1, 0, 3),
  },
  dashboardMetaDataItem: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    marginBottom: theme.spacing(0.75),
  },
  infoKey: {
    fontWeight: 500,
    fontSize: '0.875rem',
    letterSpacing: '0.02em',
    lineHeight: '150%',
    color: theme.palette.highlight,
  },
  infoValue: {
    fontSize: '0.875rem',
    letterSpacing: '0.02em',
    lineHeight: '150%',
  },
  checkBoxesContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    maxHeight: '8rem',
    overflowY: 'scroll',
    paddingLeft: theme.spacing(1),
  },
  formControlLabel: {
    fontSize: '0.625rem',
    letterSpacing: '0.02em',
    lineHeight: '150%',
  },
  inlineIcon: {
    margin: theme.spacing(0.5, 1, 0, 0),
    width: '1rem',
    height: '1rem',
  },
  linkIcon: {
    margin: theme.spacing(0, 0, 0.45, 0.75),
    width: '1rem',
    height: '1rem',
  },
  iconWithTextDiv: {
    display: 'flex',
  },
}));

export default useStyles;
