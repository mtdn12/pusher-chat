import React from "react";
import "./ChatList.css";
import { Typography } from "@material-ui/core";

const ChatList = ({ chats }) => (
  <div className="ChatList">
    {chats.map((chat, index) => (
      <Typography variant="body1" key={index} color="inherit">
        <span className="userName">{chat.username}:</span>{chat.message}
      </Typography>
    ))}
  </div>
);
export default ChatList;
