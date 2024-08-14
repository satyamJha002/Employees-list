export const validate = ({ name, username, password }) => {
  const error = {};
  const passwordPattern =
    /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;

  const usernamePattern = /^[0-9A-Za-z]{6,16}$/;

  if (!name) {
    error.name = "Name is required";
  }

  if (!username) {
    error.username = "Username is required";
  } else if (!usernamePattern.test(username)) {
    error.username = "Username not alphanumeric";
  }

  if (!password) {
    error.password = "Password is required";
  } else if (!passwordPattern.test(password)) {
    error.password =
      "At least one each of a number, uppercase letter, lowercase letter, and non-alphanumeric, correct length";
  }

  return error;
};
