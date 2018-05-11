import React, { Fragment, Component } from 'react';
import { AppBar } from 'material-ui';
import TextField from 'material-ui/TextField';
import Radium from 'radium';
import FontIcon from 'material-ui/FontIcon';
import { blue500, red500, greenA200 } from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Style from './css/appBar.css';

const lineHeight = "64px";
const style = {
  appBar: {
    justifyContent: "space-between"
  },
  title: {
    height: "64px",
    flex: "none",
  },
  menuIcon: {
    display: "none",
  },
  inputStyle: {
    backgroundColor: "white",
    lineHeight: lineHeight,
    paddingLeft: "5%",
    paddingRight: "5%",
    width: "90%",
  },
  textField: {
    lineHeight: lineHeight,
  },
  rightMenuIcon: {
    lineHeight: lineHeight,
  },
  rightMenuIconChild: {
    height: "36px",
    width: "36px",
  },
  searchIcon: {
    verticalAlign: "middle",
    fontSize: "36px",
    padding: "0 10px 0 0",
  },
  deleteIcon: {
    verticalAlign: "middle",
    fontSize: "36px",
    padding: "0 0 0 10px",
  },
  searchBlock: {
    lineHeight: lineHeight,
  }
}

class Search extends Component {

  handleInput = (event, newValue) => {
    // console.log('handleChange');
    this.props.onSearch(newValue);
  }

  handleClear = () => {
    this.props.onClear();
    // this.setState({ value: '' })
  }

  // componentWillReceiveProps(nextProps, prevState) {

  //   if (nextProps.searchValue !== prevState.value) {
  //     this.setState({ value: nextProps.searchValue });
  //   }
  // }


  render() {
    return (
      <div
        className="search-block"
        style={style.searchBlock}
      >
        <FontIcon
          className="material-icons"
          hoverColor={greenA200}
          style={style.searchIcon}
        >
          search
        </FontIcon>
        <TextField
          id="text-field-search"
          inputStyle={style.inputStyle}
          underlineStyle={{ bottom: "2px" }}
          style={style.textField}
          value={this.props.searchValue}
          onChange={this.handleInput}
        />
        <FontIcon
          className="material-icons"
          hoverColor={red500}
          style={style.deleteIcon}
          onClick={this.handleClear}
        >
          close
      </FontIcon>
      </div>
    );
  }
}

const MenuIcon = props => (
  <IconMenu
    iconButtonElement={
      <IconButton
        style={style.rightMenuIcon}
        iconStyle={style.rightMenuIconChild}
      >
        <MoreVertIcon />
      </IconButton>}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
  >
    <MenuItem
      primaryText="ADD"
      onClick={props.callDialog}
    />
  </IconMenu>
);

export default Radium((props) => (
  <AppBar
    title="TaskBoard"
    className="app-bar"
    titleStyle={style.title}
    style={style.appBar}
  >
    <Search {...props} />
    <MenuIcon {...props} />
  </AppBar>
));
