import React from 'react';


export default (tasks) => {
    localStorage.setItem('addedTasks', JSON.stringify(tasks));
}