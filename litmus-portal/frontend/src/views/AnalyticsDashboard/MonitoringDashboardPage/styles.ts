import MuiAccordion from '@material-ui/core/Accordion';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  rootPanel: {
    display: 'inline-block',
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    margin: theme.spacing(1.5, 0, 1),
  },

  rootPanelGroup: {
    width: '100%',
    display: 'inline-block',
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    paddingBottom: 0,
    marginBottom: theme.spacing(1),
  },
  panelGroup: {
    display: 'flex',
    alignContent: 'left',
    background: theme.palette.disabledBackground,
  },
  panelGroupContainer: {
    width: '100%',
    background: theme.palette.cards.header,
    display: 'inline-grid',
    gridTemplateColumns: '48.5% 48.5%',
    gridGap: theme.spacing(3),
    padding: theme.spacing(1),
  },

  expand: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
  },

  panelGroupTitle: {
    fontWeight: 700,
    fontSize: '1rem',
  },

  title: {
    fontWeight: 700,
    fontSize: '0.9rem',
    color: theme.palette.text.primary,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(2),
  },

  singleGraph: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    height: '27.5rem',
  },
  popoutModal: {
    width: '85%',
    height: '95%',
    padding: '2rem',
    paddingLeft: '10%',
  },
  wrapperParentIconsTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  wrapperIcons: {
    display: 'flex',
  },
  pannelIcon: {
    width: '0.9rem',
    height: '0.9rem',
  },
  pannelIconButton: {
    backgroundColor: 'transparent !important',
    cursor: 'pointer',
    display: 'flex',
    padding: theme.spacing(0.5),
    paddingBottom: 0,
  },
}));

export const Accordion = withStyles({
  root: {
    border: 0,
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

export default useStyles;
