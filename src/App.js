import React, { useState, useEffect, useCallback } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import {
  Paper,
  List,
  Container,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import "./App.css";
import { call, signout } from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]);
  const [todoItems, setTodoItems] = useState("");
  const [loading, setLoading] = useState(true);

  // add 함수 추가
  const addItem = async (item) => {
    const response = await call("/todo", "POST", item);
    setItems(response.data);
    setTodoComponents();
    console.log(items);
  };

  const deleteItem = useCallback(
    async (item) => {
      const response = await call("/todo", "DELETE", item);
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
    },
    [items]
  );

  const updateItem = async (item) => {
    const response = await call("/todo", "PUT", item);
    setItems(response.data);
  };

  const setTodoComponents = useCallback(
    () =>
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
      ),
    [items, deleteItem]
  );

  const getAllItems = useCallback(async () => {
    const response = await call("/todo", "GET", null);
    setItems(response.data);
    setTodoComponents();
  }, [setTodoComponents]);

  useEffect(() => {
    getAllItems();
    setLoading(false);
  }, [getAllItems, setLoading]);

  const navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout}>
              logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  // loading 중이 아닐 때
  const todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );

  // loading 중일 때
  const loadingPage = <h1>로딩중..</h1>;
  let content = loadingPage;

  if (!loading) {
    content = todoListPage;
  }

  return <div className="App">{content}</div>;
}

export default App;
