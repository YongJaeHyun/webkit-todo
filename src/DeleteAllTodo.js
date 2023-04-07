import { IconButton } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import React from "react";

class DeleteAllTodo extends React.Component {
  constructor(props) {
    super(props);
    this.deleteAll = props.deleteAll;
  }

  deleteAllHandler = () => {
    this.deleteAll();
  };

  render() {
    return (
      <div>
        delete All Todo
        <IconButton aria-label="Delete" onClick={this.deleteAllHandler}>
          <DeleteOutlined />    
        </IconButton>
      </div>
    );
  }
}

export default DeleteAllTodo;
