import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { orange500, blue500 } from 'material-ui/styles/colors';

const styles={
  error:{
    color: orange500
  }
}

export default class DialogComponent extends Component {

  state = {
    title: '',
    description: '',
  }

  handleAddItem = () => {
    const { closeDialog, onAddTask } = this.props;
    const { title="", description="" } = this.state;
    closeDialog();
    onAddTask(
      {
        title,
        description
      });
    this.handleClearState()
  }

  handleInputChangeTitle = (event) => {
    const { value = '' } = event.target;
    this.setState({ title: value });
  }
  handleInputChangeDescription = (event) => {
    const { value = '' } = event.target;
    this.setState({ description: value });
  }

  handleClearState = () => {
    return this.setState(
        { 
            title: "",
            description: ""
        }
      );
  }

  render() {
    const { title } = this.state;
    const { open } = this.props;
   
    const actions = [
      <FlatButton
        label="Cancel"
        primary={ true }
        onClick={() => {
          this.handleClearState();
          this.props.closeDialog();
        }}
        
      />,
      <FlatButton
        label="Submit"
        primary={ true }
        keyboardFocused={ false }
        onClick={ this.handleAddItem }
        disabled={ !this.state.title.length }
      />
    ];

    return (
      <Dialog
        open={ open }
        aria-labelledby="form-dialog-title"
        actions={ actions }
        title="Add new Task"
        modal={ false }
        onRequestClose={ this.props.closeDialog }
      >
        <TextField
          autoFocus
          hintText="Your Task"
          fullWidth
          onChange={ this.handleInputChangeTitle }
          value={ this.state.title }
          errorText={ !this.state.title.length?"This field is required":false }
          errorStyle={ styles.error }

        />
        <TextField
          autoFocus
          hintText="Description"
          fullWidth
          onChange={ this.handleInputChangeDescription }
          value={ this.state.description }
          multiLine={ true }
        />
      </Dialog>
    )
  }
}
