import React, { useState } from "react";
import useORM from "./orm/hooks/useORM";

function App() {
  const { context } = useORM();
  const { User } = context;

  const [name, setName] = useState("");
  const users = User.all();

  const addUser = (e: any) => {
    e.preventDefault();

    User.create({
      name
    });

    setName("");
  };

  const deleteUser = (id: any) => {
    User.delete(id);
  };

  return (
    <div>
      <div>
        <form onSubmit={addUser}>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button type="submit">add</button>
        </form>
      </div>

      <div>
        {users.map((user: any) => {
          return (
            <div key={user.id}>
              <div onClick={() => deleteUser(user.id)}>
                {user.id}, {user.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
