import React, { Component } from "react";
import MessageSingle from "../MessageSingle";

import "./MessagesContainer.scss";
class MessagesContainer extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    // get todo container
    let scrollParent = this.refs.scrollParent;
    // scrollTop on container is always equal to scrolling height (bottom)
    scrollParent.scrollTop = scrollParent.scrollHeight;
  }

  render() {
    let messagesOutput = null;
    if (this.props.todoes.length > 0) {
      messagesOutput = this.props.todoes.map(todo => {
        return (
          <MessageSingle
            message={todo.message}
            id={todo.id}
            key={todo.id}
            deleteTodo={event => this.props.deleteTodo(event, todo.id)}
            createdAt={todo.createdAt}
          />
        );
      });
    } else {
      messagesOutput = <h4>No todo's, add one. :) </h4>;
    }
    return (
      <div className="MessagesContainer-parent" ref="scrollParent">
        <div className="MessagesContainer">{messagesOutput}</div>
      </div>
    );
  }
}

export default MessagesContainer;
