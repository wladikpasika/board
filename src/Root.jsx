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
//import AlertSearch from './components/AlertSearch';
import handleStorage from './LocalStorage/storageUpdate'
import storageCheck from './LocalStorage/storageCheck'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const styles = {
  headerColumn: {
    textAligth: "center !important",
  }
}

export default class Root extends Component {
  state = {
    tasks: {},
    filteredTasks: {},
    todoTasks: {},
    dialogAdd: false,
    dialogEdit: false,
    alertAdd: false,
    alertResult: false,
    taskTodelete: null,
    alertDeleteConfirm: false,
    titleByDefault: null,
    descriptionByDefault: null,
    keyEditedTask: null,
    dialogEdit: false,
    searchValue: '',
    //alertSearch: false,
  }
  iterator = 0;

  handleAddItem = (values = {}) => {
    const { tasks } = this.state;
    const { title, description } = values;
    const date = new Date();

    const newItem = {
      title,
      description,
      status: 'todo',
      time: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    };

    const newTasks = {
      ...tasks,
      [this.iterator++]: newItem
    };

    this.setState({
      tasks: newTasks
    });
  }

  handleUpdateFilteretedTasks(searchValue, tasks) {
    let newFilteredTasks = {};

    Object.keys(tasks).filter(propName => (
      tasks[propName].title.toLowerCase().includes(searchValue.toLowerCase()) !== false ||
      tasks[propName].description.toLowerCase().includes(searchValue.toLowerCase()) !== false
    )).forEach(propName => newFilteredTasks[propName] = tasks[propName]);

    return newFilteredTasks;
  }

  handleAddItemCheck = (values) => {
    const { title, description } = values;

    if (title
      && title.trim()
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

  /* handleAlertSearch = () => {
     this.setState({
       alertSearch: !this.state.alertSearch
     })
   }*/

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
    if (title && title.trim()) {
      this.handleEditItem(this.state.keyEditedTask, values);
    }
    else {
      this.handleAlertAdd();
    }
  }

  handleEditDialogCall = (values = {}) => {
    const { title, description, key } = values;
    console.log(title, description, key);
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

    this.setState({ searchValue: value });
  }

  handleClearSearchInput = () => {
    this.setState({ searchValue: '' });
  }

  handleMove = (key, status) => {
    const newTasks = { ...this.state.tasks };
    newTasks[key].status = status;
    this.setState({ tasks: newTasks })
  }

  componentDidMount() {
    const cashedTasks = storageCheck();

    if (cashedTasks) {
      this.setState({
        tasks: cashedTasks,
        filteredTasks: cashedTasks
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, tasks } = this.state;
    const copyTasks = { ...tasks };

    if (prevState.tasks !== this.state.tasks) {
      handleStorage(this.state.tasks);
    };

    if (searchValue && searchValue !== prevState.searchValue) {
      const newTasks = this.handleUpdateFilteretedTasks(searchValue, tasks);
      this.setState({ filteredTasks: newTasks });
    }

    // if (prevState.searchValue !== searchValue) {
    //   if (!prevState.searchValue.length) {
    //     this.setState({ filteredTasks: copyTasks })
    //   }
    //   else {
    //     console.log(2)
    //     this.setState({ filteredTasks: this.handleUpdateFilteretedTasks(tasks) });
    //   }
    // }
    // else if (prevState.tasks !== tasks) {
    //   console.log(3)
    //   this.setState({ filteredTasks: this.handleUpdateFilteretedTasks(tasks) });
    // }
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
      filteredTasks,
      taskTodelete,
    } = this.state;

    const TableExampleSimple = () => (
      <Table
        selectable={false}
      >
        <TableHeader
          selectable={false}
          displaySelectAll={false}
        >
          <TableRow selectable={false} >
            <TableHeaderColumn style={styles.headerColumn}>Todo</TableHeaderColumn>
            <TableHeaderColumn style={styles.headerColumn}>In Progress</TableHeaderColumn>
            <TableHeaderColumn style={styles.headerColumn}>Done</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn><List
              tasks={this.state.filteredTasks}
              onAlertConfirm={this.handleAlertConfirm}
              onEdit={this.handleEditDialogCall}
              status="todo"
              onMove={this.handleMove}
            /></TableRowColumn>
            <TableRowColumn><List
              tasks={this.state.filteredTasks}
              onAlertConfirm={this.handleAlertConfirm}
              onEdit={this.handleEditDialogCall}
              status="inProgress"
              onMove={this.handleMove}
            /></TableRowColumn>
            <TableRowColumn><List
              tasks={this.state.filteredTasks}
              onAlertConfirm={this.handleAlertConfirm}
              onEdit={this.handleEditDialogCall}
              status="done"
              onMove={this.handleMove}
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
          {/*<AlertSearch
            open={alertSearch}
            handleAlert={this.handleAlertSearch}
          />*/}
          <AlertDeleteConfirm
            open={alertDeleteConfirm}
            onAlertConfirm={this.handleAlertConfirm}
            allowDeletePermission={this.allowDeletePermission}
            deletedTask={taskTodelete ? filteredTasks[taskTodelete].title : null}
          />
          <Header
            callDialog={this.handleAddDialogCall}
            onSearch={this.handleSearchInput}
            onClear={this.handleClearSearchInput}
            searchValue={this.state.searchValue}
          />
          <TableExampleSimple />
        </Fragment>
      </MuiThemeProvider>
    );
  }
}
