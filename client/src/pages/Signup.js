import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {toast} from "react-hot-toast"
const Signup = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const { name, email, password } = credentials;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3002/api/v1/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );
      const data = await response.json();

      if (data?.success) {
        localStorage.setItem("token", data?.authtoken);
        navigate("/");
        toast.success("Your account is created")
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container" style={{width:"70%"}}>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title">Signup</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    aria-describedby="nameHelp"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-1">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="cpassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    name="cpassword"
                    autoComplete="confirm-password"
                    onChange={onChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Signup
                </button>
                <p className="text-center">
                  Already have an account ?
                  <Link style={{ textDecoration: "none" }} to="/login">
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

export default Signup;
