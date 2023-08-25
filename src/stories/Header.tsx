import React from "react";

import { Button } from "./Button";
import "./header.css";

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onHomeClick?: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
  onProfile?: () => void;
  onAdmin?: () => void;
}

export const Header = ({
  user,
  onHomeClick,
  onLogin,
  onLogout,
  onCreateAccount,
  onProfile,
  onAdmin,
}: HeaderProps) => (
  <header>
    <div className="storybook-header">
      <div>
        <h1>NextJS App</h1>
      </div>
      <div>
        {user ? (
          <>
            <Button size="small" onClick={onHomeClick} label="Home" />
            <Button size="small" onClick={onProfile} label="Profile" />
            <Button size="small" onClick={onAdmin} label="Admin" />
            <Button size="small" onClick={onLogout} label="Logout" />
          </>
        ) : (
          <>
            <Button size="small" onClick={onHomeClick} label="Home" />
            <Button size="small" onClick={onLogin} label="Login" />
            <Button size="small" onClick={onCreateAccount} label="Register" />
          </>
        )}
      </div>
    </div>
  </header>
);
