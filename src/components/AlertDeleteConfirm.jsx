import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


export default class AlertDeleteConfirm extends Component {
  
  render() {
    const { open, onAlertConfirm, allowDeletePermission } = this.props; ///

    const actions = [
        <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => {
            onAlertConfirm();
        }}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onClick={() => {
            allowDeletePermission();
        }}
      />
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={onAlertConfirm}
        >
          "Are you sure?"
        </Dialog>
      </div>
    );
  }
}
