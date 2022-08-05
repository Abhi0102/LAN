let userData = [
  { name: "test", email: "test@gmail.com", password: "12345678", joinedOn: "" },
];

export function getUserData() {
  return userData;
}

export function setUserData(data) {
  userData = [data, ...userData];
  return userData;
}
