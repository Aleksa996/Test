import React, { useState } from "react";
import axios from "axios";

import "./Register.css";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password } = user;
    if (name && email && password) {
      axios
        .post("http://localhost:5000/api/users/signup", user)
        .then((res) => console.log(res));
    } else {
      alert("invalid input");
    }
  };
  return (
    <div className="container">
      <form action="*">
        <div className="row">
          <div className="col-25">
            <label htmlFor="name">Name</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="FullName"
            />
          </div>
        </div>
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
          <input type="submit" onClick={register} />
        </div>
      </form>
    </div>
  );
};

export default Register;
