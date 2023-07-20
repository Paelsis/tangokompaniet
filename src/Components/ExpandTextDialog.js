import React from 'react';
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog';
import Button from '@material-ui/core/Button';
import tkColors from 'Settings/tkColors'
import grey from '@material-ui/core/colors/grey'
import {LANGUAGE_EN, LANGUAGE_SV, LANGUAGE_ES} from 'redux/actions/actionsLanguage'

const styles = {
    anchor:{
      textDecoration: 'underline', 
      cursor:'pointer',
    },
    text:{
      color:tkColors.color,
      cursor:'pointer',
    }
  }


class ExpandTextDialog extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    let language=this.props.language;
    const actions = [
      <Button variant="outlined" color="primary" onClick={this.handleClose}>
       {language===LANGUAGE_EN?'Close':language===LANGUAGE_ES?'Cerrer':'Stäng'}
      </Button>
      ,
    ];
    return (
      <span>
        <a style={{...styles.anchor, ...this.props.style}} onClick={this.handleOpen}>{this.props.shortText}</a>
        <Dialog
          title={this.props.title?this.props.title:this.props.name?this.props.name:'No title'}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <span style={styles.text}>
            {this.props.children}
          </span>
        </Dialog>
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      language: state.language, 
      color: state.style.color
  }
}    


ExpandTextDialog = connect(mapStateToProps)(ExpandTextDialog)

export default ExpandTextDialog;
