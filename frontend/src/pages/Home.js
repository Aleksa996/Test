import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Home.css";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const axiosPosts = async () => {
      const response = await axios("http://localhost:5000/api/users");
      setUsers(response.data.user);
    };
    axiosPosts();
  }, []);

  const deleteUser = (event) => {
    const userId = event.target.id;
    const axiosDelete = async () => {
      await axios.delete("http://localhost:5000/api/users/" + userId);
    };
    axiosDelete();
  };

  return (
    <div className="row">
      {users.map((user) => (
        <div className="column" key={user.id}>
          <div className="card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <button id={user.id} className="btn" onClick={deleteUser}>
              Delete
            </button>
            <button className="btn">Update</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
