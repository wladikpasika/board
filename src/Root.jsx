import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import AddTask from './components/PromptDialogAdd';
import EditeTask from './components/PrompDialogEdit';
import AlertAdd from './components/AlertAdd';
import List from './List';
import AlertDeleteConfirm from './components/AlertDeleteConfirm';
import AlertSearch from './components/AlertSearch';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export default class Root extends Component {
  state = {
    tasks: {},
    filteredTasks: {},
    todoTasks: {},
    dialogAdd: false,
    dialogEdit: false,
    alertAdd: false,
    alertResult:false,
    taskTodelete: null,
    alertDeleteConfirm: false,
    titleByDefault: null,
    descriptionByDefault: null,
    keyEditedTask: null,
    dialogEdit: false,
    searchValue: '',
    alertSearch: false,
  }
  iterator = 0;

  handleAddItem = (values = {}) => {
    const { tasks } = this.state;
    const { title, description } = values;
  
    const newItem = {
      title,
      description,
      status: 'todo',
    };

    const newTasks = {
      ...tasks,
      [this.iterator++]: newItem
    };

    this.setState({
      tasks: newTasks
    });
  }

  handleUpdateFilteretedTasks( values ){
    const { searchValue } = this.state;
    const regexp = new RegExp(searchValue, 'ig');
    const newTasks = {
      ...values
    };

    let newFilteredTasks = {};
      Object.keys(newTasks).filter(propName => (
        newTasks[propName].title.search(regexp) !== -1  ||
        newTasks[propName].description.search(regexp) !== -1 
      )).forEach(propName => newFilteredTasks[propName] = newTasks[propName]);
    return newFilteredTasks;
  }

  handleAddItemCheck = (values) => {
    const { title, description } = values;

    if (title
      && title.trim()
      && description
      && description.trim()
    ) {
      this.handleAddItem(values);
    }
    else {
      this.handleAlertAdd();
    }
    this.setState({ isAddPrompt: false });
  }

  handleEditItem = (key, newValues) => {
    const { tasks } = this.state;
    const { title, description } = newValues;
    const newItems = { ...tasks };
    newItems[key].title = title;
    newItems[key].description = description;

    this.setState({ tasks: newItems });
  }

  handleRemoveItem = () => {
    const { tasks, taskTodelete } = this.state;
    const newItems = { ...tasks };
    delete newItems[taskTodelete];
    this.setState({
      tasks: newItems,
      taskTodelete: null
    });
  }

  handleAddDialogCall = () => {
    this.setState({
      dialogAdd: true,
    })
  }

  handleAddDialogClose = () => {
    this.setState({
      dialogAdd: false
    });
  }

  handleAlertAdd = () => {
    this.setState({
      alertAdd: !this.state.alertAdd
    })
  }

  handleAlertSearch = () => {
    this.setState({
      alertSearch: !this.state.alertSearch
    })
  }

  handleAlertConfirm = (key) => {
    if (key) {
      this.setState({ taskTodelete: key })
    }
    else {
      this.setState({ taskTodelete: null })
    }
    return this.setState({
      alertDeleteConfirm: !this.state.alertDeleteConfirm,
    }
    )
  }

  allowDeletePermission = () => {
    this.handleRemoveItem();
    this.handleAlertConfirm();
  }

  handleEditDialogClose = () => {
    this.setState({
      titleByDefault: '',
      descriptionByDefault: '',
      keyEditedTask: null,
      dialogEdit: false,
    });
  }

  handleEditTask = (values) => {
    const { title, description } = values
    if (title
      && title.trim()
      && description
      && description.trim()
    ) {
      this.handleEditItem(this.state.keyEditedTask, values);
    }
    else {
      this.handleAlertAdd();
    }
  }

  handleEditDialogCall = (values = {}) => {
    const { title, description, key } = values;
    this.setState({
      titleByDefault: title,
      descriptionByDefault: description,
      keyEditedTask: key,
      dialogEdit: true,
    });
  };

  handleSearchInput = (value) => {
    const { tasks, alertSearch } = this.state;
    let filteredTasks;

    if( value.length >3 ){
      filteredTasks = this.handleUpdateFilteretedTasks(tasks);

      this.setState({
          filteredTasks: filteredTasks,
          searchValue: value
        }, ()=>{
          !Object.keys(filteredTasks).length
          ?this.handleAlertSearch()
          :false
        })
    }
    else{
        this.setState({searchValue: value});
    }
  }

  handleClearSearchInput = () => {
    this.setState({ searchValue: '' });
  }

  handleMove = (key, status) => {
    const newTasks = { ...this.state.tasks };
    newTasks[key].status = status;
    console.log(newTasks,'newTasks');
    this.setState({tasks:newTasks}, ()=>{
      console.log(this.state.tasks,'Tasks');
    })

  }

  componentWillUpdate(nextProps, nextState) {
    const { searchValue, tasks } = this.state;
    const copyTasks = { ...tasks };

    if (nextState.searchValue !== searchValue) {
      if(!nextState.searchValue.length){
        this.setState({ filteredTasks: copyTasks })
      }
    }
    else if( nextState.tasks !== tasks ){
      this.setState({ filteredTasks: this.handleUpdateFilteretedTasks(nextState.tasks)}
    )
    }
  }

  render() {
    const {
      dialogAdd,
      dialogEdit,
      titleByDefault,
      descriptionByDefault,
      alertAdd,
      alertDeleteConfirm,
      tasks,
      alertSearch,
    } = this.state;

    const TableExampleSimple = () => (
      <Table
      selectable={false}
      >
        <TableHeader 
          selectable={false}
          displaySelectAll={false}
        >
          <TableRow selectable={false} 
          >
            <TableHeaderColumn >Todo</TableHeaderColumn>
            <TableHeaderColumn >In Progress</TableHeaderColumn>
            <TableHeaderColumn >Done</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn><List
                tasks={this.state.filteredTasks}
                onAlertConfirm={this.handleAlertConfirm}
                onEdit={this.handleEditDialogCall}
                status="todo"
                onMove = {this.handleMove}
              /></TableRowColumn>
            <TableRowColumn><List
                tasks={this.state.filteredTasks}
                onAlertConfirm={this.handleAlertConfirm}
                onEdit={this.handleEditDialogCall}
                status="inProgress"
                onMove = {this.handleMove}
              /></TableRowColumn>
            <TableRowColumn><List
                tasks={this.state.filteredTasks}
                onAlertConfirm={this.handleAlertConfirm}
                onEdit={this.handleEditDialogCall}
                status="done" 
                onMove = {this.handleMove}
              /></TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    );

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Fragment>
          <AddTask
            open={dialogAdd}
            closeDialog={this.handleAddDialogClose}
            onAddTask={this.handleAddItemCheck}
            handleAlert={this.handleAlertAdd}
          />
          <EditeTask
            open={dialogEdit}
            onClose={this.handleEditDialogClose}
            onEdit={this.handleEditTask}
            defaultValueTitle={titleByDefault}
            defaultValueDescription={descriptionByDefault}
          />
          <AlertAdd
            open={alertAdd}
            handleAlert={this.handleAlertAdd}
          />
          <AlertSearch
            open={alertSearch}
            handleAlert={this.handleAlertSearch}
          />
          <AlertDeleteConfirm
            open={alertDeleteConfirm}
            onAlertConfirm={this.handleAlertConfirm}
            allowDeletePermission={this.allowDeletePermission}
          />
          <Header
            callDialog={this.handleAddDialogCall}
            onSearch={this.handleSearchInput}
            onClear={this.handleClearSearchInput}
            searchValue={this.state.searchValue}
          />
          
         {/*<List
            tasks={this.state.filteredTasks}
            onAlertConfirm={this.handleAlertConfirm}
            onEdit={this.handleEditDialogCall}
            status="todo"
            onMove = {this.handleMove}
          />
          <List
            tasks={this.state.filteredTasks}
            onAlertConfirm={this.handleAlertConfirm}
            onEdit={this.handleEditDialogCall}
            status="inProgress"
            onMove = {this.handleMove}
          />
          <List
            tasks={this.state.filteredTasks}
            onAlertConfirm={this.handleAlertConfirm}
            onEdit={this.handleEditDialogCall}
            status="done" 
            onMove = {this.handleMove}
          />*/} 
          <TableExampleSimple />
          
        </Fragment>
      </MuiThemeProvider>
    );
  }
}
