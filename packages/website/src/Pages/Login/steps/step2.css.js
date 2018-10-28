const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#EFEFEF',
    }
  },
});

export default styles;