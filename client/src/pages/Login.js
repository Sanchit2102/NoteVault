import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {toast} from "react-hot-toast"

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3002/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const data = await response.json();

      if (data?.success) {
        localStorage.setItem("token", data?.authtoken);
        navigate("/");
        toast.success("Login Successfully")
      } else {
        toast.error("Login with correct credentials");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container" style={{width:"60%"}}>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title">Login</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label ">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={credentials.email}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label ">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    value={credentials.password}
                    onChange={onChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary ">
                  Login
                </button>
                <p className="text-center">
                  Don't have an account ?
                  <Link style={{ textDecoration: "none" }} to="/signup">
                    {" "}
                    click here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
