import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const SignUp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

  const { signUpUser } = useContext(UserContext);
  const [newUser, setnewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setnewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser(newUser);
  };
  return (
    <div className="container col-4 my-5">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">New User! Sign up</h1>

        <div className="form-floating mb-2">
          <input
            type="name"
            className="form-control"
            placeholder="name@example.com"
            required
            minLength={3}
            id="name"
            name="name"
            value={newUser.name}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Enter your name</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            required
            id="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            minLength={8}
            id="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {/* <div className="form-floating mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="confirmPassword"
            required
            minLength={8}
            id="confirmPassword"
            name="confirmPassword"
            value={newUser.confirmPassword}
            onChange={handleChange}
          />
          <label htmlFor="floatingPassword">confirm Password</label>
        </div> */}
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign Up
        </button>
        <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
      </form>
    </div>
  );
};

export default SignUp;
