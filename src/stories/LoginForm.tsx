import React from "react";
import { Button } from "./Button";
import { Header } from "./Header";
import "./LoginForm.css";

interface Tab {
  id: number;
  title: string;
  content: string;
}

interface LoginProps {
  message?: string;
  onEmptyClick?: boolean;
  onPasswordDontMatch?: boolean;
  onFullClick?: boolean;
  onError?: boolean;
  onSuccess?: boolean;
  showError?: boolean;
  showPasswordError?: boolean;
  showToast?: boolean;
  handleSubmit?: () => void;
}

type User = {
  name: string;
};

const Form = ({ message, showError, showToast, handleSubmit }: LoginProps) => {
  return (
    <form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
          gap: "10px",
          flexDirection: "column",
        }}
      >
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
      </div>
      <div
        style={{
          //   textAlign: "center",
          margin: "20px 0",
        }}
      >
        <Button
          onClick={handleSubmit}
          label="Login"
          backgroundColor="black"
          color="white"
          padding="15px 14%"
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
  );
};

const GoogleButton = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <hr style={{ position: "absolute", width: "10%", left: "38%" }} />
        <p style={{ textAlign: "center", fontWeight: "600", margin: "15px" }}>
          OR
        </p>
        <hr style={{ position: "absolute", width: "10%", left: "52%" }} />
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
    </>
  );
};

export const LoginForm = ({
  message,
  onEmptyClick,
  onPasswordDontMatch,
  onFullClick,
  onError,
  onSuccess,
}: LoginProps) => {
  const [user, setUser] = React.useState<User>();
  const [showError, setShowError] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const handleSubmit = () => {
    onEmptyClick && setShowError(true);
    onEmptyClick && onPasswordDontMatch;
    onError && setShowToast(true);
    onSuccess && setShowToast(true);
  };
  const tabs = [
    {
      id: 1,
      title: "User",
      content: (
        <>
          <Form
            handleSubmit={handleSubmit}
            showError={showError}
            showToast={showToast}
            message={message}
          />
          <GoogleButton />
        </>
      ),
    },
    {
      id: 2,
      title: "Admin",
      content: (
        <Form
          handleSubmit={handleSubmit}
          showError={showError}
          showToast={showToast}
          message={message}
        />
      ),
    },
  ];
  const [activeTab, setActiveTab] = React.useState<number>(tabs[0]?.id);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [showToast]);

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
        <div className="tabs">
          <div className="tab-header">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab ${tab.id === activeTab ? "active" : ""}`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.title}
              </div>
            ))}
          </div>
          <div className="tab-content">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab-pane ${tab.id === activeTab ? "active" : ""}`}
              >
                {tab.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
