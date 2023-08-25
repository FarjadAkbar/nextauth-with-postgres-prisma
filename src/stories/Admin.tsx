import React from "react";
import { Header } from "./Header";
import "./Admin.css";
import { Button } from "./Button";

type User = {
  name: string;
};

const tableHead = [
  { key: "ID", value: "ID" },
  { key: "Username", value: "Username" },
  { key: "EmailAddress", value: "Email Address" },
  { key: "Status", value: "Status" },
  { key: "Action", value: "Action" },
];

const Admin = () => {
  const [user, setUser] = React.useState<User>();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [showToast]);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = () => {
    setShowToast(true);
    setIsDialogOpen(false);
  };

  const tableData = [
    {
      key: 1,
      value: {
        id: 1,
        userName: "John Doe",
        email: "abc@xyz.com",
        status: "Pending",
      },
    },
    {
      key: 2,
      value: {
        id: 2,
        userName: "John Doe",
        email: "abc@xyz.com",
        status: "Pending",
      },
    },
    {
      key: 3,
      value: {
        id: 3,
        userName: "John Doe",
        email: "abc@xyz.com",
        status: "Pending",
      },
    },
  ];

  return (
    <>
      <Header
        user={user}
        onLogin={() => setUser({ name: "Jane Doe" })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: "Jane Doe" })}
        onHomeClick={() => setUser({ name: "Jane Doe" })}
      />
      <div className="admin-page">
        <table>
          <tr>
            {tableHead &&
              tableHead?.map((item) => <th key={item?.key}>{item?.value}</th>)}
          </tr>
          {tableData.map((item) => (
            <tr key={item.key}>
              <td>{item.value.id}</td>
              <td>{item.value.userName}</td>
              <td>{item.value.email}</td>
              <td>{item.value.status}</td>
              <td>
                <Button
                  onClick={handleOpenDialog}
                  label="Approve"
                  backgroundColor="green"
                  color="white"
                />
              </td>
            </tr>
          ))}
        </table>
        {isDialogOpen && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <p>Are you sure you want to proceed?</p>
              <div className="button-container">
                <button onClick={handleConfirm}>Yes</button>
                <button onClick={handleCloseDialog}>No</button>
              </div>
            </div>
          </div>
        )}
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
            <span>User verified successfully!</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
