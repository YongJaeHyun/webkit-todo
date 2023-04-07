import { Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import { call } from "./service/ApiService";
import React from "react";

class UpdateUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleUsername = (e) => {
    const username = e.target.value;
    this.setState({ username });
  };
  handleEmail = (e) => {
    const email = e.target.value;
    this.setState({ email });
  };
  handlePassword = (e) => {
    const password = e.target.value;
    this.setState({ password });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    await call("/auth/user", "PUT", { username, password, email });
    window.location.href = "/";
  };

  getUserInfo = async () => {
    const userId = localStorage.getItem("USER_ID");
    const response = await call(`/auth/user?id=${userId}`, "GET", null);
    const { username, email } = response;
    this.setState({ email });
    this.setState({ username });
  };

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    return (
      <Container>
        <form noValidate onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5">
                회원 정보 수정
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                value={this.state.email}
                onChange={this.handleEmail}
                required
                fullWidth
                id="email"
                label="이메일 주소"
                autoFocus
                InputProps={{
                  disabled: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                value={this.state.username}
                onChange={this.handleUsername}
                required
                fullWidth
                id="username"
                label="사용자 이름"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="password"
                name="password"
                variant="outlined"
                value={this.state.password}
                onChange={this.handlePassword}
                required
                fullWidth
                id="password"
                label="패스워드"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                회원 정보 수정
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default UpdateUserInfo;
