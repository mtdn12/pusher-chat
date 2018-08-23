import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    text: "",
    username: "Tuan",
    chats: []
  };
  componentDidMount (){
    // const username = window.prompt("Username: ", "Anonymous");
    // this.setState({ username });
    const pusher = new Pusher("6adc10843981b62e1553", {
      cluster: "ap1",
      encrypted: true
    });
    const chanel = pusher.subscribe("chat")
    chanel.bind("message", data => {
      console.log('hi bind a message')
      this.setState({ chats: [...this.state.chats, data], text: "" });
    });
  };
  handleTextChange =  e  => {
    this.setState({ text: e.target.value });
  };
  handleEnterChat  = e => {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text
      };
      axios.post("/api/message", payload);
    }
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React-Pusher Chat</h1>
        </header>
        <section>
          <ChatList chats={this.state.chats} />
          <ChatBox
            text={this.state.text}
            username={this.state.username}
            handleTextChange={this.handleTextChange}
            handleEnterChat={this.handleEnterChat}
          />
        </section>
      </div>
    );
  }
}

export default App;
