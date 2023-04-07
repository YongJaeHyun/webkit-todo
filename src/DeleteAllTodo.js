import { IconButton } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import React from "react";

function DeleteAllTodo(props) {
  const { deleteAllItem } = props;

  const deleteAllHandler = () => {
    deleteAllItem();
  };

  return (
    <div>
      delete All Todo
      <IconButton aria-label="Delete" onClick={deleteAllHandler}>
        <DeleteOutlined />
      </IconButton>
    </div>
  );
}

export default DeleteAllTodo;
