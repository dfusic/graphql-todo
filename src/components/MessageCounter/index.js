import React from 'react';

const MessageCounter = props => {
  return (
    <div className="MessageCounter">
      <h3>{props.count} messages</h3>
    </div>
  )
}

export default MessageCounter;