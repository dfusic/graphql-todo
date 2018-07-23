import React from "react";
import "./MessageInput.scss";

const MessageInput = props => {
  return (
    <div className="MessageInput">
      <form onSubmit={props.addNewTodo}>
        <input
          type="text"
          onChange={props.handleNewTodo}
          value={props.newTodoValue}
          required
          placeholder="Enter your message..."
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default MessageInput;
