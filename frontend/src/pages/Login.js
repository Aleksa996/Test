import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "./Login.css";

const Login = ({ setLoginUser }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios.post("http://localhost:5000/api/users/login", user).then((res) => {
      alert(res.data.message);
      setLoginUser(res.data.user);
      history.push("/Home");
    });
  };

  return (
    <div className="container">
      <form action="*">
        <div className="row">
          <div className="col-25">
            <label htmlFor="email">Email</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="password">Password</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="password"
            />
          </div>
        </div>

        <div className="row">
          <input type="submit" onClick={login} />
        </div>
      </form>
    </div>
  );
};

export default Login;
