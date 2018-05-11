import React, { Component, Fragment } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui';
import Radium from 'radium';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';



import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class ComponentList extends Component {

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
                      key,
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
                  rightIcon={ rightHandler }
                >
                <Card>
                    <CardHeader
                      title={ title }
                      actAsExpander={ true }
                      showExpandableButton={ true }
                    />
                    <CardText expandable = {true}>
                    {description}
                    </CardText>
              </Card>
                </ListItem>       
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