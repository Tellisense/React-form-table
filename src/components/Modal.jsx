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
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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
    height: '100%',
    zIndex: 1

  },
  innerDiv: {
    margin: '10rem auto',
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: '70vw',
    height: '50vh',
    zIndex: 2
  },
  pointer: {
    cursor: 'pointer'
  }
}));

export default function Modal({ openModal, handleOpenModal, children }) {
  const classes = useStyles();


  const handleBgClick = e => {
    if (e.target.id === 'bg') {
      handleOpenModal()
    }
  }

  return (
    <div id="bg" onClick={handleBgClick} className={`${classes.outerDiv}   ${openModal ? classes.show : classes.hide}`}>
      <Box boxShadow={2} className={classes.innerDiv}>
        <header className={classes.header}><div>Modal Header</div><HighlightOffIcon onClick={handleOpenModal} className={classes.pointer} /></header>
        <main>
          {children}
        </main>
      </Box>
    </div>
  );
}