import React from "react";
import "./ChatBox.css";
import { TextField, Button, Grid } from "@material-ui/core";

const ChatBox = ({ text, handleTextChange, handleSendMessage }) => (
  <Grid container justify="space-between">
    <Grid item xs={10}>
      <TextField
        onChange={handleTextChange}
        placeholder="Chat here..."
        value={text}
        fullWidth
        multiline
        InputProps={{
          disableUnderline: true
        }}
      />
    </Grid>
    <Grid item xs={2}>
      <Button variant="raised" color="primary" onClick={handleSendMessage}>
        Send
      </Button>
    </Grid>
  </Grid>
);

export default ChatBox;
