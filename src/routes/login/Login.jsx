import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });

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
                      <button
                        className="w-100 btn btn-lg btn-primary"
                        type="submit"
                      >
                        Login
                      </button>
                      <p className="mt-4 mb-1 text-muted">
                        Don't have an account ?{" "}
                        <Link to="/sign-up">Sign Up</Link>
                      </p>
                      {/* <p className="mt-5 mb-3 text-muted">© 2017–2023</p> */}
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

export default Login;
