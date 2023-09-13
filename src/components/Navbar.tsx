import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <nav className="bg-slate-900 p-1">
      <div className="flex items-center gap-4 shadow-md">
        <h1 className="border-r-2 border-slate-700 p-2 text-xl">Marketplace</h1>

        <Link className="nav-item" href={"/"}>
          Home
        </Link>

        {user && (
          <Link className="nav-item" href={`profile/${user.id}`}>
            Profile
          </Link>
        )}
        {user ? (
          <button className="nav-item ml-auto" onClick={() => void signOut()}>
            Sign Out
          </button>
        ) : (
          <button className="nav-item ml-auto" onClick={() => void signIn()}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
