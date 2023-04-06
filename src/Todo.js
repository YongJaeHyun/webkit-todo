import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";

function Todo(props) {
  const { deleteItem, updateItem } = props;
  const [item, setItem] = useState(props.item);
  const [isReadOnly, setIsReadOnly] = useState(true);

  const deleteEventHandler = () => {
    deleteItem(item);
  };
  const offReadOnlyMode = () => {
    setIsReadOnly(false);
    console.log("ReadOnly?", isReadOnly);
  };
  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      setIsReadOnly(true);
      updateItem(item);
    }
  };
  const editEventHandler = (e) => {
    const value = e.target.value;
    setItem({ ...item, title: value });
  };
  const checkboxEventHandler = () => {
    setItem({ ...item, done: !item.done });
    updateItem({ ...item, done: !item.done });
  };

  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{ "aria-label": "naked", readOnly: isReadOnly }}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
          onClick={offReadOnlyMode}
          onChange={editEventHandler}
          onKeyPress={enterKeyEventHandler}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={deleteEventHandler}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;
