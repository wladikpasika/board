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
import AlertSearch from './components/AlertSearch'

export default class Root extends Component {
  state = {
    tasks: {},
    filteredTasks: {},
    todoTasks: {},
    dialogAdd: false,
    dialogEdit: false,
    alertAdd: false,
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
    const { tasks, searchValue } = this.state;
    const { title, description } = values;
    const newFilteredTasks = {};

    const newItem = {
      title,
      description,
      status: 'todo',
    };

    const newTasks = {
      ...tasks,
      [this.iterator++]: newItem
    };

    Object.keys(newTasks).filter(propName => (
      newTasks[propName].title.includes(searchValue) ||
      newTasks[propName].description.includes(searchValue)
    )).forEach(propName => newFilteredTasks[propName] = newTasks[propName]);

    this.setState({
      tasks: newTasks,
      filteredTasks: newFilteredTasks
    });
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

  // todoFilters() {

  //   const { tasks, filteredTask, searchValue } = this.state;
  //   const copyTasks = { ...tasks };
  //   // here we are filter filtersTask object  by status
  //   const todoTasks = () => {
  //     const newTasks = {};
  //     const keys = Object.keys(filteredTask).filter(keys => filteredTask[keys].status === "todo");
  //     keys.forEach(key => newTasks[key] = filteredTask[key]);
  //     return newTasks;
  //   }
  //   return todoTasks();
  // }

  filtersTasks = () => {


    // const regexp = new RegExp(searchValue, 'ig');
    //const copyTasks = { ...tasks }


    // const tasksKeys = Object.keys(filteredTask);
    // const newFilteredTasks = {};

    // tasksKeys.forEach(key => {
    //   filteredTask[key].title.search(regexp) !== -1
    //     ? newFilteredTasks[key] = filteredTask[key]
    //     : false
    // });

    // if (Object.keys(newFilteredTasks).length) {
    //   this.setState({ filteredTask: newFilteredTasks })
    // }
  }

  componentWillUpdate(nextProps, nextState) {
    const { searchValue, tasks } = this.state;

    const copyTasks = { ...tasks };

    if (nextState.searchValue !== searchValue) {
      if(nextState.searchValue == 0 ){
        this.setState({ filteredTasks: copyTasks })
      }
    }
  }

  // componentDidUpdate(prevProps, prevState) {

  //   const { tasks, filteredTask, searchValue } = this.state;
  //   const copyTasks = { ...tasks };

  //   if (prevState.tasks !== tasks) {
  //     this.setState( // copy to filtersTask all items
  //       {
  //         filtersTask: copyTasks
  //       }
  //     )
  //   }
  //   else if (prevState.filtersTask !== filteredTask) {
  //     this.setState({
  //       todoTasks: this.todoFilters() //update todo
  //     });
  //   }
  //   else if (prevState.searchValue !== searchValue) {

  //     const prevLength = prevState.searchValue.length;
  //     const currentLength = searchValue.length;
  //     const clear = () => this.setState({
  //       searchValue: '',
  //       filtersTask: { ...tasks }
  //     });

  //     if (prevLength === 0 && currentLength > 3) {
  //       this.filtersTasks(); //when update search value, we`re updating filtersTask in State
  //     }
  //     else if (prevLength === 0 && currentLength <= 3) {
  //       clear();
  //       this.handleAlertSearch();
  //     }
  //     else if (prevLength > 3 && currentLength <= 3 && currentLength !== 0) {
  //       clear();
  //       this.handleAlertSearch();
  //     }
  //     else if (prevLength > 3 && currentLength === 0) {
  //       clear();
  //     }
  //   }
  // }

  handleSearchInput = (value) => {
    const { tasks } = this.state;
    const newFilteredTasks = {};

    Object.keys(tasks).filter(propName => (
      tasks[propName].title.includes(value) ||
      tasks[propName].description.includes(value)
    )).forEach(propName => newFilteredTasks[propName] = tasks[propName]);

    this.setState({
      filteredTasks: newFilteredTasks,
      searchValue: value
    });
  }

  handleClearSearchInput = () => {
    this.setState({ searchValue: '' });
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
          <List
            tasks={this.state.filteredTasks}
            onAlertConfirm={this.handleAlertConfirm}
            onEdit={this.handleEditDialogCall}
          />
        </Fragment>
      </MuiThemeProvider>
    );
  }
}