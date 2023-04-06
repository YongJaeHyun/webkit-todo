import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { Paper, List, Container } from "@material-ui/core";
import "./App.css";
import { call } from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]);
  const [todoItems, setTodoItems] = useState("");

  // add 함수 추가
  const addItem = async (item) => {
    const response = await call("/todo", "POST", item);
    setItems(response.data);
    setTodoItems(
      items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List>
            {items.map((item) => (
              <Todo
                item={item}
                key={item.id}
                deleteItem={deleteItem}
                updateItem={updateItem}
              />
            ))}
          </List>
        </Paper>
      )
    );
    console.log(items);
  };

  const deleteItem = async (item) => {
    const response = await call("/todo", "DELETE", item);
    setItems(response.data);
  };

  const updateItem = async (item) => {
    console.log(item)
    const response = await call("/todo", "PUT", item);
    setItems(response.data);
  };

  const getAllItems = async () => {
    const response = await call("/todo", "GET", null);
    const items = response.data;
    setTodoItems(
      items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List>
            {items.map((item) => (
              <Todo
                item={item}
                key={item.id}
                deleteItem={deleteItem}
                updateItem={updateItem}
              />
            ))}
          </List>
        </Paper>
      )
    );
  };

  useEffect(() => getAllItems());

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
