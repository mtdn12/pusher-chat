import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import "./App.css";
import { Typography } from "@material-ui/core";

class App extends Component {
  state = {
    text: "",
    username: "",
    chats: []
  };
  componentDidMount = async () => {
    const username = window.prompt("Username: ", "Anonymous");
    await this.setState({ username });
    const pusher = new Pusher("6adc10843981b62e1553", {
      cluster: "ap1",
      encrypted: true
    });
    const chanel = pusher.subscribe(`chat`);
    console.log(chanel);
    chanel.bind(`message-${this.state.username}`, data => {
      console.log("hi bind a message");
      this.setState({ chats: [...this.state.chats, data], text: "" });
    });
  };
  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };
  handleSendMessage = () => {
    const payload = {
      username: this.state.username,
      message: this.state.text
    };
    axios.post("/api/message", payload);
  };
  render() {
    return (
      <div className="App">
        <section className="container">
          <Typography
            align="center"
            variant="title"
            color="primary"
            gutterBottom
          >
            Welcome {this.state.username}
          </Typography>
          <ChatList chats={this.state.chats} />
          <ChatBox
            text={this.state.text}
            handleTextChange={this.handleTextChange}
            handleSendMessage={this.handleSendMessage}
          />
        </section>
      </div>
    );
  }
}

export default App;
