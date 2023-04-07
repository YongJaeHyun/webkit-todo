import { Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import { call } from "./service/ApiService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateUserInfo() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };
  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await call("/auth/user", "PUT", { username, email, password });
    navigate("/");
  };

  const getUserInfo = async () => {
    const userId = localStorage.getItem("USER_ID");
    const response = await call(`/auth/user?id=${userId}`, "GET", null);
    const { username, email } = response;
    console.log("getUserInfo : ", response);
    setEmail(email);
    setUsername(username);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit}>
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
              value={email}
              onChange={handleEmail}
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
              value={username}
              onChange={handleUsername}
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
              value={password}
              onChange={handlePassword}
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

export default UpdateUserInfo;
