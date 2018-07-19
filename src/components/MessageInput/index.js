import React from 'react';

const MessageInput = props => {
  return (
    <div className="MessageInput">
      <form onSubmit={props.addNewTodo}>
        <input type="text" onChange={props.handleNewTodo} value={props.newTodoValue} required/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default MessageInput;