import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  useState,
} from "react";

type Props = {
  user: UserData;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type UserData = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
} & {
  id: string;
};

export default function UserButton({ user, ...props }: Props) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  if (user.image)
    return (
      <div {...props}>
        <button onClick={toggleVisibility}>
          <img
            className="rounded-full border-2 border-slate-500"
            src={user.image}
            alt="User Image"
            width={40}
          />
        </button>
        {visible && (
          <div className="absolute right-0 flex flex-col border-2 border-slate-900 bg-slate-800 p-2">
            <div className="flex gap-2 border-b-2 border-slate-900 pb-2">
              <img
                className="rounded-full border-2 border-slate-500"
                src={user.image}
                alt="User Image"
                width={64}
              />
              <div className="flex flex-col">
                <p className="text-left text-xl">{user.name}</p>
                <p>{user.email}</p>
              </div>
            </div>
            <Link className="btn text-center" href={`profile/${user.id}`}>
              Profile
            </Link>
            <button className="btn" onClick={() => void signOut()}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
}