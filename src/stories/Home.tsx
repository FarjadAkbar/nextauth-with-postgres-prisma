import React from "react";
import { Header } from "./Header";

type User = {
  name: string;
};

const Home = () => {
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
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <h2>Welcome to NextAuth with Prisma ORM and Next.js 13</h2>
      </div>
    </>
  );
};

export default Home;
