import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import AddTask from './components/PromptDialogAdd'
import EditeTask from './components/PrompDialogEdit'
import AlertAdd from './components/AlertAdd'
import List from './List'
import AlertDeleteConfirm from './components/AlertDeleteConfirm'

export default class Root extends Component{
    state = {
      tasks: {},
      filtersTask:{},
      todoTasks:{},
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
    }
    iterator = 0;

    handleAddItem = (values = {}) => {
      const { tasks } = this.state;
      const { title, description } = values;
      const newTasksObject = {...tasks,[this.iterator++]:{
        title,
        description,
        status:'todo',
      }
    };
      this.setState({tasks:newTasksObject});
    }
    handleAddItemCheck = ( values ) => {
      const { title, description } = values;
  
      if (title 
        && title.trim()
        && description 
        && description.trim()
      ) {
        this.handleAddItem( values );
      }
     else {
        this.handleAlertAdd();
      }
      this.setState({ isAddPrompt: false });
    }
    handleEditItem = ( key, newValues ) => {
      const { tasks } = this.state;
      const { title, description } = newValues;
      const newItems = { ...tasks };
      newItems[ key ].title = title;
      newItems[ key ].description = description;
  
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

    handleAlertAdd = () =>{
      this.setState({
        alertAdd: !this.state.alertAdd
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
    );
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
        &&description 
        && description.trim()
      ) {
        this.handleEditItem(this.state.keyEditedTask, values);
      }
      else {
        this.handleAlertAdd();
      }
    }
    handleEditDialogCall = (values={}) => {
      const { title, description, key } = values;
      this.setState({
        titleByDefault: title,
        descriptionByDefault: description,
        keyEditedTask: key,
        dialogEdit: true,
      });
    };

    componentDidUpdate(prevProps, prevState){

      const { tasks, filtersTask, searchValue } = this.state;
      const copyTasks = {...tasks};

      const todoTasks = () => {
        const newTasks = {};
        const keys = Object.keys(tasks).filter(keys => tasks[keys].status==="todo");
        keys.forEach(key => newTasks[key]=tasks[key]);
        return newTasks;
      }
      if(prevState.tasks!==tasks){
         // copy to filtersTask
          this.setState(
            {
              filtersTask: copyTasks
            }
        )
      }
      else if(prevState.filtersTask!==filtersTask){
        this.setState({
          todoTasks: todoTasks()
        });
      }
      else if(prevState.searchValue !== searchValue){
        this.filtersTasks();
      }
  }
  
  handleSearchInput = (value) => {
    this.setState({searchValue: value});
  }

  handleClearSearchInput = () => {
    this.setState({searchValue: ''});
  }

  filtersTasks = () => {
    const { searchValue, filtersTask } = this.state;
    const regexp = new RegExp(searchValue,'ig');
    const newTasks = Object.keys({...filtersTask});
    
    newTasks.filter((key)=>{
      let task = filtersTask[key]; console.log(task,newTasks);
      
    });
    console.log(newTasks);


  }
    render(){
      const { 
        dialogAdd, 
        dialogEdit, 
        titleByDefault,
        descriptionByDefault, 
        alertAdd, 
        alertDeleteConfirm, 
        tasks, 
      } = this.state;
    
        return (
          <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
              <Fragment>
                  <AddTask 
                    open={ dialogAdd }
                    closeDialog={ this.handleAddDialogClose }
                    onAddTask={ this.handleAddItemCheck }
                    handleAlert={ this.handleAlertAdd }
                  />
                  <EditeTask
                    open={ dialogEdit }
                    onClose={ this.handleEditDialogClose }
                    onEdit={ this.handleEditTask }
                    defaultValueTitle={ titleByDefault }
                    defaultValueDescription={ descriptionByDefault }
                  />
                  <AlertAdd
                    open={ alertAdd }
                    handleAlert={ this.handleAlertAdd }
                  />
                  <AlertDeleteConfirm
                    open={ alertDeleteConfirm }
                    onAlertConfirm={ this.handleAlertConfirm }
                    allowDeletePermission={this.allowDeletePermission}
                  />
                  <Header
                    callDialog={ this.handleAddDialogCall }
                    onSearch={ this.handleSearchInput }
                    onClear= {this.handleClearSearchInput}
                  />
                  <List
                    tasks={ this.state.todoTasks }
                    onAlertConfirm={ this.handleAlertConfirm }
                    onEdit={ this.handleEditDialogCall }
                  />
              </Fragment>
          </MuiThemeProvider>
          );
        }
      }