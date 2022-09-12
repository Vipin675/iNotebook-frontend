import React, { useEffect, useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Alert from "../../components/alert/Alert.component";

// Alert Context
import { AlertContext } from "../../context/AlertContext";

const handleLogOut = () => {
  localStorage.removeItem("token");
};
const Navigation = () => {
  const { alert } = useContext(AlertContext);
  const location = useLocation();
  useEffect(() => {}, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          {!localStorage.getItem("token") ? (
            <div className="">
              <Link
                to="/login"
                className="btn btn-sm btn-outline-light mx-1"
                role="button"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className="btn btn-sm btn-primary mx-1"
                role="button"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm btn-danger mx-1"
              role="button"
              onClick={handleLogOut}
            >
              Log out
            </Link>
          )}
        </div>
      </nav>
      <Alert alert={alert} />
      <Outlet />
    </>
  );
};

export default Navigation;
