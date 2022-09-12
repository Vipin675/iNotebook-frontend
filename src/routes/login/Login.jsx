import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(user);
  };

  return (
    <div className="container col-4 my-5">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating mb-2">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
      </form>
    </div>
  );
};

export default Login;
