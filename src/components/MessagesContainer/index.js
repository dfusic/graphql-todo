import React from 'react';
import MessageSingle from '../MessageSingle';

const MessagesContainer = props => {
  let messagesOutput = null;
  if(props.todoes.length > 0){
    messagesOutput = props.todoes.map(todo=>{
      return <MessageSingle 
      message={todo.message}
      id={todo.id}
      key={todo.id}
      deleteTodo={(event)=>props.deleteTodo(event, todo.id)}
      createdAt={todo.createdAt}
      />
    })
  }
  return (
    <div className="MessagesContainer">
      <h1>Messages Container</h1>
      {messagesOutput}
    </div>
  )
}

export default MessagesContainer;