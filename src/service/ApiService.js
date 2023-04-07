import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";
const USER_ID = "USER_ID";

export function call(api, method, request) {
  let headers = new Headers({
     "Content-Type": "application/json",
    });
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  const parseJSON = function(response) {
    return response.text().then(function(text) {
      return text ? JSON.parse(text) : {}
    })
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) =>
    parseJSON(response).then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch((error) => {
      console.log("Oops!");
      console.log(error.status);
      console.log("Ooops!");
      if (error.status === 403) {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    });
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      // local 스토리지에 토큰 저장
      localStorage.setItem(ACCESS_TOKEN, response.token);
      localStorage.setItem(USER_ID, response.id);

      // token이 존재하는 경우 todo 화면으로 리디렉트
      window.location.href = "/";
    }
  });
}

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO)
    .then((response) => {
      console.log("func signup :", response);
      if (response.id) {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.log("Oops!");
      console.log(error.status);
      console.log("Ooops!");
      if (error.status === 403) {
        window.location.href = "/signup";
      }
      return Promise.reject(error);
    });
}

export function signout() {
  // local 스토리지에 토큰 삭제
  localStorage.setItem(ACCESS_TOKEN, null);
  localStorage.setItem(USER_ID, null);

  window.location.href = "/";
}