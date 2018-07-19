import React from 'react';

const MessageSingle = props => {
  return (
    <div className="MessageSingle" key={props.id} id={props.id}>
      <p>{props.message}</p>
    </div>
  );
}

export default MessageSingle;