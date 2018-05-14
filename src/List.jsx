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
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import style from './css/list.css';

const styles = {
  menuItemNone: { display: "none" },
  menuItemBlock: { display: "block" },
  cardText:{ whiteSpace: "normal" }
};

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
    const { tasks = {}, onAlertConfirm, status, onMove } = this.props;

    return (
      <div className="list-item">
        <List>
          {
            Object.keys(tasks).map((key, index) => {

              if(tasks[key].status === status){
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
                <MenuItem
                  primaryText="Move To"
                  rightIcon={<ArrowDropRight />}
                  menuItems={[
                      <MenuItem primaryText="Move to Todo" 
                      style = {
                        status==='todo'
                        ?styles.menuItemNone
                        :styles.menuItemBlock 
                      }
                      onClick = {() => onMove(key, 'todo')}
                      />,
                      <MenuItem primaryText='Move to "In Progress"' 
                        style = {
                        status==='inProgress'
                        ?styles.menuItemNone
                        :styles.menuItemBlock
                        }
                        onClick = {() => onMove(key, 'inProgress')}
                      />,
                      <MenuItem primaryText="Move to Done" 
                      style = {
                        status==='done'
                        ?styles.menuItemNone
                        :styles.menuItemBlock
                        }
                        onClick = {() => onMove(key, 'done')}
                      />,
          ]}
        />
              </IconMenu>
            )
            return (
              <div key={index}
              className="card"
              >
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
              </div>
            );  
              }  
          })  
        }
        </List>
      </div>
    );
  }
}

export default Radium(ComponentList);