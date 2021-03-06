import React from 'react';
import TodoListService from './../services/todo-list-service';
import PubSub from 'pubsub-js';

export default React.createClass({
    onSubmit: function (e) {
        e.preventDefault();
        var description = this.refs.description.value.trim(),
            date = this.refs.todoDate.value.trim();
        //todo:validation
        var todo = {
            description: description,
            date: date
        };
        TodoListService.addTodo(todo);
        var newData = TodoListService.getTodoList();
        PubSub.publish('reloadTodoList', newData);
    },

    render: function () {
        return (
            <form className='todo-form' onSubmit={this.onSubmit}>
                <input type='text' id='todoDescription' placeholder='描述' ref='description'/>
                <input type='date' id='todoDate' ref='todoDate'/>
                <input type='submit' id='submitTodo' value='提交'/>
            </form>
        );
    }
});
