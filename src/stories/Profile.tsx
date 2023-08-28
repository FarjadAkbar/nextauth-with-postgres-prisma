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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2
          style={{
            marginBottom: "5px",
            fontSize: "36px",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Profile Page
        </h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <img
              src="/images/default.png"
              className="max-h-36"
              alt="profile photo of user"
            />
          </div>
          <div>
            <p>Name: John Doe</p>
            <p>Email: abc@xyz.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
