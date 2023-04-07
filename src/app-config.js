let backendHost;

const hostname = window?.location?.hostname;

console.log("hostname", hostname);
if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
} else {
    backendHost = "http://192.168.106.228:8080";
}

export const API_BASE_URL = `${backendHost}`;
