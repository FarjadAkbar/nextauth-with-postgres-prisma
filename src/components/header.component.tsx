"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type User = {
  id: string;
  email: string;
  username: string;
  randomKey: string;
  role: string;
};

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as User;
  

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

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
          {!user ? (
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
          ) : (
            <>
              {user.role === "ADMIN" && (
                <li>
                  <Link href="/admin" className="text-ct-dark-600">
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <Link href="/profile" className="text-ct-dark-600">
                  Profile
                </Link>
              </li>
              <li className="cursor-pointer" onClick={handleLogout}>
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
