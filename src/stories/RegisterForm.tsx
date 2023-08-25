import React from "react";
import { Button } from "./Button";
import { Header } from "./Header";

interface RegisterProps {
  message?: string;
  onEmptyClick?: boolean;
  onPasswordDontMatch?: boolean;
  onFullClick?: boolean;
  onError?: boolean;
  onSuccess?: boolean;
}
type User = {
  name: string;
};

export const RegisterForm = ({
  message,
  onEmptyClick,
  onPasswordDontMatch,
  onFullClick,
  onError,
  onSuccess,
}: RegisterProps) => {
  const [user, setUser] = React.useState<User>();
  const [showError, setShowError] = React.useState(false);
  const [showPasswordError, setShowPasswordError] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [showToast]);
  const handleSubmit = () => {
    onEmptyClick && setShowError(true);
    onEmptyClick && onPasswordDontMatch && setShowPasswordError(true);
    onError && setShowToast(true);
    onSuccess && setShowToast(true);
  };
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
        <h1>Register</h1>
        <form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{ color: showError ? "red" : "black" }}
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
              />
              {showError && (
                <p style={{ color: "red", marginBottom: "0" }}>
                  Username must be at least 2 characters.
                </p>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{ color: showError ? "red" : "black" }}
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                placeholder="Enter your email address"
              />
              {showError && (
                <p style={{ color: "red", marginBottom: "0" }}>
                  Email must be a valid email address.
                </p>
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{ color: showError ? "red" : "black" }}
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
              {showError && (
                <p style={{ color: "red", marginBottom: "0" }}>
                  Password must be at least 6 characters
                </p>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{ color: showError ? "red" : "black" }}
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter your password again"
              />
              {showError && !showPasswordError && (
                <p style={{ color: "red", marginBottom: "0" }}>
                  Please re-enter password correctly
                </p>
              )}
              {showPasswordError && showPasswordError && (
                <p style={{ color: "red", marginBottom: "0" }}>
                  Password do not match
                </p>
              )}
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              margin: "20px 0",
            }}
          >
            <Button
              onClick={handleSubmit}
              label="Submit"
              backgroundColor="black"
              color="white"
              padding="15px 24%"
              upper="uppercase"
              // style={{ background: "#000", color: "#fff", padding: "15px 7%" }}
            />
            <div
              style={{
                display: showToast ? "block" : "none",
                position: "absolute",
                left: "40%",
                top: "14%",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.3)",
                padding: "15px 20px",
              }}
              className="toast"
            >
              <div className="toast-content">
                <span>{message}</span>
              </div>
            </div>
          </div>
        </form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <hr style={{ position: "absolute", width: "14%", left: "34%" }} />
          <p style={{ textAlign: "center", fontWeight: "600", margin: "15px" }}>
            OR
          </p>
          <hr style={{ position: "absolute", width: "14%", left: "52%" }} />
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <a
            style={{
              backgroundColor: "#000",
              padding: "20px",
              marginTop: "10px",
              color: "white",
              textTransform: "uppercase",
              textAlign: "center",
            }}
            role="button"
          >
            <img
              className="pr-2"
              src="/images/google.svg"
              alt=""
              style={{ height: "2rem" }}
            />
            Continue with Google
          </a>
        </div>
      </div>
    </>
  );
};
