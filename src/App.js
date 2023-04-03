import React, { useState, useEffect, useCallback } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { Paper, List, Container } from "@material-ui/core";
import "./App.css";

function App() {
  const [items, setItems] = useState([
    { id: "0", title: "Todo 1 ", done: true },
    { id: "1", title: "Todo 2 ", done: false },
  ]);

  const [todoItems, setTodoItems] = useState("");

  // add 함수 추가
  const addItem = (item) => {
    const thisItems = items;
    item.id = "ID-" + thisItems.length; //key를 위한 id 추가
    item.done = false;
    thisItems.push(item);
    setItems(thisItems);
    setTodoItems(
      items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List>
            {items.map((item) => (
              <Todo item={item} key={item.id} deleteItem={deleteItem} />
            ))}
          </List>
        </Paper>
      )
    );
    console.log(items);
  };

  const deleteItem = useCallback(
    (item) => {
      const thisItems = items;
      const newItems = thisItems.filter((e) => e.id !== item.id);
      setItems(newItems);
      console.log("Update Items : ", items);
    },
    [items]
  );

  useEffect(() => {
    setTodoItems(
      items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List>
            {items.map((item) => (
              <Todo item={item} key={item.id} deleteItem={deleteItem} />
            ))}
          </List>
        </Paper>
      )
    );
  }, [items, deleteItem]);

  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );
}

export default App;
