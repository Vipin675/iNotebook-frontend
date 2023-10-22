import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://images.unsplash.com/photo-1616628188550-808682f3926d?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem", height: "35rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex flex-column justify-content-center align-items-center mb-3 pb-1">
                        <img
                          style={{ height: "5rem" }}
                          src="notexpress.png"
                          alt=""
                        />
                        <span className="h1 fw-bold mb-0">NoteXpress</span>
                      </div>

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
                      <button
                        className="w-100 btn btn-lg btn-primary"
                        type="submit"
                      >
                        Sign Up
                      </button>
                      <p className="mt-4 mb-1 text-muted">
                        Already have an account? <Link to="/login">login</Link>
                      </p>
                      {/* <p className="mt-1 mb-1 text-muted">© 2017–2022</p> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
