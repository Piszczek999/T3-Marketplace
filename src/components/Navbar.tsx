import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <nav className="bg-slate-900 p-1 shadow-lg">
      <div className="flex items-center gap-4">
        <h1 className="border-r-2 border-slate-700 p-2 text-xl">Marketplace</h1>

        <Link className="btn" href={"/"}>
          Home
        </Link>

        {user && (
          <Link className="btn" href={`profile/${user.id}`}>
            Profile
          </Link>
        )}
        {user && (
          <Link className="btn" href={"/new-offer"}>
            Create an offer
          </Link>
        )}
        {user ? (
          <button className="btn ml-auto" onClick={() => void signOut()}>
            Sign Out
          </button>
        ) : (
          <button className="btn ml-auto" onClick={() => void signIn()}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
