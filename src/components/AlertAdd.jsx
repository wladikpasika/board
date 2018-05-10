import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


class AlertDialog extends Component {
  
  render() {
    const { message, open, handleAlert } = this.props;

    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={handleAlert}
      />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={handleAlert}
        >
          Empty Field!!!
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
