import React, { useState, useEffect } from "react";
import useORM from "./orm/hooks/useORM";
const initialUser = { id: null, name: "" };

function App() {
  const [selectedUser, setSelectedUser] = useState(initialUser);

  const { User } = useORM();

  const getUsers = User.all();

  useEffect(() => {});

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();

          if (selectedUser.id) {
            User.update(selectedUser.id, selectedUser);
          } else {
            User.create(selectedUser);
          }

          setSelectedUser(initialUser);
        }}
      >
        <input
          type="text"
          value={selectedUser.name}
          onChange={e => {
            setSelectedUser({ ...selectedUser, name: e.target.value });
          }}
        />
        <button>{selectedUser.id ? "update" : "add"} </button>
      </form>

      <div>
        {getUsers.map((user: any) => {
          return (
            <div
              key={user.id}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div style={{ margin: 10 }}>
                {user.id} {user.name}
              </div>

              <div
                style={{ margin: 10 }}
                onClick={() => {
                  setSelectedUser(user);
                }}
              >
                edit
              </div>

              <div
                style={{ margin: 10 }}
                onClick={() => {
                  User.delete(user.id);
                }}
              >
                delete
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
