import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

import MessageCounter from './MessageCounter';
import MessageInput from './MessageInput';
import MessagesContainer from './MessagesContainer';

import './App.scss';
// init graphql client and give it graphql server endpoint
const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjjsr6hcs2y6m0103trvtj93i'
});

class App extends Component {
  // declare state for main component
  state = {
    newTodo: {
      todo: "",
    },
    avatar: "",
    todoes: [],
    todoCount: 0
  }

  componentWillMount(){
    // graphql query to fetch all todoes
    const ALL_TODOES_QUERY = {
      query: gql`
        query{
          allTodoes{
            id,
            message,
            createdAt
          }
        }
      `
    };
    //get all todoes from server
    client.query(ALL_TODOES_QUERY)
    .then(data=>{
      // if todoes are fetched
      // get array of all todoes
      let todoes = data.data.allTodoes;
      // add all fetched todoes to the state of the component
      this.setState({
        todoes: [...todoes]
      })
    })
    .catch(error=>{
      alert("Error! Check the console!");
      console.error(error);
    })
  }


  // new todo handler
  handleNewTodo(event){
    // set state to input value
    this.setState({
      newTodo: {
        todo: event.target.value
      }
    })
  }
  // mutate new todo to database
  addNewTodo = event => {
    // prevent default HTML behavior (submiting)
    event.preventDefault();
    // declare new post mutation for graphql
    const NEW_POST_MUTATION = {
      mutation: gql`
      mutation{
        createTodo(
          message: "${this.state.newTodo.todo}"
        ),{
          id,
          message,
          createdAt
        }
      }`
    };
    // call mutation
    client.mutate(NEW_POST_MUTATION)
      .then((data)=>{
        // if data is succesfully sent to database
        // append newest post to current posts
        // reset new post to nothing, also reset MessageInput value
        this.setState({
          todoes: [
            ...this.state.todoes,
            data.data.createTodo
          ],
          newTodo: {
            todo: ""
          }
        });
      })
      .catch((error)=>{
        // if there was an error 
       alert("Error! check console!");
       console.error(error);
      })
  }
  deleteTodo = (event, id) => {
    // call mutation to delete todo via ID
    const DELETE_TODO_MUTATION = {
      mutation: gql`
      mutation{
        deleteTodo( 
          id: "${id}"
        ),{
          message
          id
          createdAt
        }
      }
      `
    };
    client.mutate(DELETE_TODO_MUTATION)
    .then((data)=>{
      //if the element has been succesfully deleted from the database
      //find index of the deleted element 
      let deletedElemIndex = this.state.todoes.findIndex(todo=>{
        return todo.id === id;
      });
      // copy the state
      let todoesCopy = [...this.state.todoes];
      // remove the element from the state using .splice
      todoesCopy.splice(deletedElemIndex, 1);
      // replace old state with updated state
      this.setState({
        todoes: todoesCopy
      });
    })
    .catch((error)=>{
      //if there was a problem deleting the element
      alert("There has been an error! Check the console!");
      console.error(error);
    })
  }

  // edited todo
  render() {
    return (
      <div className="App">
        <MessageCounter 
        count={this.state.todoes.length}
        />
        <MessagesContainer 
        todoes={this.state.todoes}
        deleteTodo={this.deleteTodo}

        />
        <MessageInput 
        handleNewTodo={this.handleNewTodo.bind(this)}
        addNewTodo={this.addNewTodo}
        newTodoValue={this.state.newTodo.todo}
        />
      </div>
    );
  }
}

export default App;
