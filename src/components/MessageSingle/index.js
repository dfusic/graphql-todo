import React, {Component} from 'react';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import './MessageSingle.css';
import userImg from '../../assets/user.jpeg';
// declare client to send edit mutation
const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjjsr6hcs2y6m0103trvtj93i'
});

class MessageSingle extends Component {
  state = {
    input: this.props.message,
    postDate: ""
  }
  todoMsgFocus(){
    // focus on message that is sibling of the clicked button
    this.todoMsg.focus();
  }
  getEdited = (event) =>{
    // get value of the edited input field and update the state
    this.setState({
      input: event.target.value,
      date: ""
    });
  }

  submitEdited = event => {
    // when the user exits the input submit the mutation
    let clickedId = event.target.id;
    const UPDATE_TODO = {
      mutation: gql`
        mutation{
          updateTodo(
            id: "${clickedId}",
            message: "${this.state.input}"
          ),{
            id,
            updatedAt,
            message
          }
        }
      `
    }
    // call mutation
    client.mutate(UPDATE_TODO)
    .then((data)=>{
      // get time date in ISO format
      let updateDate = new Date(data.data.updateTodo.updatedAt);
      // convert ISO format to time string
      let updateDateTimeString = updateDate.toTimeString();

      this.setState({
        // get date string and append only time numbers to it
        date: `${updateDate.toDateString()} ${updateDateTimeString.substring(0,8)}`
      })
    })
    .catch((error)=>{
      // if there was a problem with mutation
      alert("There was an error trying to edit the TODO! Check the console.");
      console.error(error);
    })
  }
  componentWillMount(){
    // when the component will mount, convert the ISO date format to more readable one
    let todoDate = new Date(this.props.createdAt);
    let timeDate = todoDate.toTimeString();

    this.setState({
      date: `${todoDate.toDateString()} ${timeDate.substring(0,8)}`
    })
  }
  render(){
    return (
      <div className="MessageSingle" key={this.props.id}>
      <img src={userImg} alt="This is you!" height={100}/>
      <input 
      type="text"
      value={this.state.input}
      id={this.props.id}
        ref={(input)=>{ 
          this.todoMsg = input;
        }}
      onChange={this.getEdited}
      onBlur={this.submitEdited}
      />
      <p>{this.state.date}</p>
      <button onClick={this.todoMsgFocus.bind(this)}>
      Edit
      </button>
      <button 
      onClick={this.props.deleteTodo}>
      Delete
      </button>
    </div>
    );
    
  }
}

export default MessageSingle;