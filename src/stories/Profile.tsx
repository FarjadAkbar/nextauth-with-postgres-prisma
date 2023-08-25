import React from "react";
import { Header } from "./Header";

type User = {
  name: string;
};

const Profile = () => {
  const [user, setUser] = React.useState<User>();
  return (
    <>
      <Header
        user={user}
        onLogin={() => setUser({ name: "Jane Doe" })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: "Jane Doe" })}
        onHomeClick={() => setUser({ name: "Jane Doe" })}
      />
      <div></div>
    </>
  );
};

export default Profile;
