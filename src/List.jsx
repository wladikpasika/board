import React, { PureComponent, Fragment } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui';
import Radium from 'radium';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';



class ComponentList extends PureComponent {

  handleEditTask = (values) => {
    const { title, description, key } = values;

    if (
      title 
      && title.trim()
      && description
      && description.trim()
    ) {
      this.props.onEdit(values);
    }
  }

  render() {
    const { tasks = {}, onAlertConfirm } = this.props;

    return (
      <div className="list-item">
        <List>
          {
            Object.keys(tasks).map((key, index) => {
              const title = tasks[key].title;
              const description = tasks[key].description;
              console.log(description);
              const rightHandler = (
              <IconMenu 
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                style = {{
                  height:"auto",
                  width:"auto",
                  margin: "0"
                }}     
              >
                <MenuItem primaryText="Edit"
                  onClick={() => {
                    this.handleEditTask({
                      title,
                      description,
                      key,//////////////!!!!!!!!!!!!!!!!
                    })
                  }} />
                <MenuItem
                  primaryText="Delete"
                  onClick={() => {
                    onAlertConfirm(key);
                  }
                }
                />
              </IconMenu>
            )
            return (
              <Fragment key={index}>
                <ListItem
                  //key={index}
                  rightIcon={rightHandler}
                >
                  <span className="checkbox-content">
                    { title }
                  </span>
                </ListItem>

                <div 
                  className = "description-list"
                  //key={index+'desk'}
                >{ description }</div>

              </Fragment>
            );
          })  
        }
        </List>
      </div>
    );
  }
}

export default Radium(ComponentList);