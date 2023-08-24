"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

type User = {
  id: string;
  email: string;
  username: string;
  randomKey: string;
  role: string; // Make sure to match the actual type of the role property
};

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user as User;
  const userRole = user?.role; // Get the user's role

  console.log(user);

  return (
    <header className="bg-white h-20">
      <nav className="h-full flex justify-between container items-center">
        <div>
          <Link href="/" className="text-ct-dark-600 text-2xl font-semibold">
            NextJS App
          </Link>
        </div>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/" className="text-ct-dark-600">
              Home
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link href="/login" className="text-ct-dark-600">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-ct-dark-600">
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              {userRole === "ADMIN" && (
                <li>
                  <Link href="/profile" className="text-ct-dark-600">
                    Profile
                  </Link>
                </li>
              )}
              <li className="cursor-pointer" onClick={() => signOut()}>
                Logout
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
