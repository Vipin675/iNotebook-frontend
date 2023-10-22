import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Alert Context -----------------------
import { AlertContext } from "./AlertContext";
// Alert Context -----------------------

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const baseAPIUrl = "https://inotebookapi-9vwo.onrender.com";

  const { showAlert } = useContext(AlertContext);
  let navigate = useNavigate();

  // LOGIN USER
  const loginUser = async (user) => {
    const { email, password } = user;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: `{"email":"${email}","password":"${password}"}`,
    };

    await fetch(`${baseAPIUrl}/api/auth/login`, options)
      .then((response) => response.json())
      .then((response) => {
        //
        if (response.success) {
          // SAVE THE AUTH TOKEN OF THE USER AND REDIRECT
          localStorage.setItem("token", response.authToken);
          navigate("/");
          showAlert("success", response.message);
        } else {
          showAlert("danger", "Invalid email or password");
        }
        //
      })
      .catch((err) => console.error(err));
  };

  //   SIGN-UP USER
  const signUpUser = async (user) => {
    const { name, email, password } = user;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: `{"name":"${name}","email":"${email}","password":"${password}"}`,
    };

    await fetch(`${baseAPIUrl}/api/auth/new-user`, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          localStorage.setItem("token", response.authToken);
          showAlert("success", response.message);
          navigate("/");
        } else {
          showAlert("success", "Some of the you entered field is invalid");
        }
        console.log(response);
      })
      .catch((err) => console.error(err));
  };

  return (
    <UserContext.Provider value={{ loginUser, signUpUser }}>
      {children}
    </UserContext.Provider>
  );
};
