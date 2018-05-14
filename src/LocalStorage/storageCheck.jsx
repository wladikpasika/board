import React from 'react';

export default () => {
    const cachedTasks = localStorage.getItem('addedTasks');
    if ( cachedTasks ) {
       return JSON.parse( cachedTasks );
    }
}