import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

interface User {
  name: string;
  email: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      fetch("/api/user/list")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
        });
    }

    fetchUsers();
  }, [users]);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.email}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
          <hr />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
