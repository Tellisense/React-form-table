import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  show: {
    display: 'block',
  },
  hide: {
    display: 'none'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'lightgray',
    height: 50,
    alignItems: 'center',
    padding: '0 15px'
  },
  outerDiv: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0, .5)',
    width: '100%',
    height: '100%'

  },
  innerDiv: {
    margin: '10rem auto',
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: '70vw',
    height: '50vh'
  }
}));

export default function Modal({ open, children }) {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false)


  React.useEffect(() => {
    // first time rendering page don't run 
    setOpenModal(true)
  }, [open])

  return (
    <div className={`${classes.outerDiv}   ${openModal ? classes.show : classes.hide}`}>
      <Box boxShadow={2} className={classes.innerDiv}>
        <header className={classes.header}><div>Modal Header</div><HighlightOffIcon /></header>
        <main>
          {children}
        </main>
      </Box>
    </div>
  );
}