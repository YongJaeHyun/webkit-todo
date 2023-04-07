import "./App.css";
import React from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Link,
  List,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { call, signout } from "./service/ApiService";
import DeleteAllTodo from "./DeleteAllTodo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
    };
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) => {
      this.setState({ items: response.data });
    });
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) => {
      this.setState({ items: response.data });
    });
  };

  deleteAll = () => {
    call("/todo/all", "DELETE", null).then((response) => {
      this.setState({ items: response.data });
    });
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) => {
      this.setState({ items: response.data });
    });
  };

  componentDidMount() {
    call("/todo", "GET", null).then((response) => {
      this.setState({ items: response.data, loading: false });
    });
  }

  render() {
    const todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );

    const navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid item>
              <Button color="inherit" style={{ marginRight: 10 }}>
                <Link
                  href="/user/update"
                  variant="body2"
                  color="inherit"
                  style={{ textDecoration: "none" }}
                >
                  회원정보수정
                </Link>
              </Button>
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
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
          <DeleteAllTodo deleteAll={this.deleteAll} />
        </Container>
      </div>
    );

    // loading 중일 때
    const loadingPage = <h1>로딩중..</h1>;
    let content = loadingPage;

    if (!this.state.loading) {
      content = todoListPage;
    }

    return <div className="App">{content}</div>;
  }
}

export default App;
