import React from 'react';

const MessageCounter = props => {
  return (
    <div className="MessageCounter">
      <h3>{props.count} things to do.</h3>
    </div>
  )
}

export default MessageCounter;