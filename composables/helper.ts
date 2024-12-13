const LOCAL_NAME = "SECRET_TOKEN";

export function getToken() {
  console.log("getToken 调用", window);
  console.log("token", ss.get(LOCAL_NAME));
  return ss.get(LOCAL_NAME);
}

export function setToken(token: string) {
  return ss.set(LOCAL_NAME, token);
}

export function removeToken() {
  return ss.remove(LOCAL_NAME);
}
