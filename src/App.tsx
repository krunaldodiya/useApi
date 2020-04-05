import React, { useState } from "react";
import User from "./models/User";

function App() {
  const [users, setUsers] = useState([]);

  const usersub = User.get();

  usersub.subscribe((users: any) => {
    setUsers(users);
  });

  console.log(users, "users");

  return (
    <div>
      <button
        onClick={() => {
          try {
            User.create({ name: "krunal" });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        add
      </button>

      <div>{JSON.stringify(users)}</div>

      <div>
        {users.map((user: any) => {
          return (
            <div key={user.id}>
              <div>{user.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
